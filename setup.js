const Pir = require("./index.js")

this.config = {
  gpio: 17,
  reverseValue: false
}

this.pir = new Pir(this.config, callback, true)

this.pir.start()

function callback(status, err) {
  if (err) console.log("[PIR:CALLBACK] " + err)
}
