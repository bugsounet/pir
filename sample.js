const Pir = require("./index.js")

this.config = {
  debug: false,
  gpio: 17,
  reverseValue: true
}

this.pir = new Pir(this.config, callback)

this.pir.start()
setTimeout(() => { this.pir.stop() } , 5000)

function callback(status, err) {
  console.log("[PIR:CALLBACK] Status: " + status)
  if (err) console.log("[PIR:CALLBACK] " + err)
}
