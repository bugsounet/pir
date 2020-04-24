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
  constructor(config, callback) {
    this.config = config
    this.callback = callback
    this.version = require('./package.json').version
    this.default = {
      debug: false,
      gpio: 21,
      reverseValue: false,
    }
    this.config = Object.assign(this.default, this.config)
    var debug = (this.config.debug) ? this.config.debug : false
    if (debug == true) log = _log
    this.debug = debug
    this.pir = null
    this.running = false
    log("Initialized")
    this.callback("PIR_INITIALIZED")
  }
  start () {
    if (this.running) return
    log("Starts v" + this.version)
    this.callback("PIR_STARTED")
    try {
      this.pir = new Gpio(this.config.gpio, 'in', 'both')
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
    this.running = false
  }
}

module.exports = PIR
