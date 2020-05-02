const Pir = require("./index.js")

this.config = {
  gpio: 17,
  reverseValue: false
}

var debug= false

this.pir = new Pir(this.config, callback, debug)

this.pir.start()
setTimeout(() => { this.pir.stop() } , 5000)

function callback(status, err) {
  console.log("[PIR:CALLBACK] Status: " + status)
  if (err) console.log("[PIR:CALLBACK] " + err)
}
