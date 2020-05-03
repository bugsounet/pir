/** PIR library **/
/** bugsounet **/

const Gpio = require('onoff').Gpio

var _log = function() {
    var context = "[PIR]"
    return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
  //do nothing
}

class PIR {
  constructor(config, callback, debug) {
    this.config = config
    this.callback = callback
    this.version = require('./package.json').version
    this.default = {
      gpio: 21,
      reverseValue: false,
    }
    if (debug == true) log = _log
    this.pir = null
    this.running = false
    console.log("[PIR] PIR v" + this.version + " Initialized...")
    this.callback("PIR_INITIALIZED")
  }
  start () {
    if (this.running) return
    log("Start")
    try {
      this.pir = new Gpio(this.config.gpio, 'in', 'both')
      this.callback("PIR_STARTED")
    } catch (err) {
      console.log("[PIR:ERROR] " + err)
      this.running = false
      return this.callback("PIR_ERROR", err)
    }
    this.running = true
    this.pir.watch( (err, value)=> {
      if (err) {
        console.log("[PIR:ERROR] " + err)
        return this.callback("PIR_ERROR", err)
      }
      log("Sensor read value: " + value)
      if ((value == 1 && !this.config.reverseValue) || (value == 0 && this.config.reverseValue)) {
        log("Detected presence (value:" + value + ")")
        this.callback("PIR_DETECTED")
      }
    })
  }

  stop () {
    if (!this.running) return
    this.pir.unwatch()
    this.pir = null
    this.callback("PIR_STOP")
    log("Stop")
    this.running = false
  }
}

module.exports = PIR