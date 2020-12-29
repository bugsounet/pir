# pir

single node routine for PIR sensor read

## Installation

```sh
npm install @bugsounet/pir
```

In the ending of installation, if you use `electron` you can do electron rebuild step.

```sh
Do you want to execute electron rebuild ? [Y/n]
Your choice:
```

## Sample with pir contructor

```js
const Pir = require("@bugsounet/pir")

this.config = {
  gpio: 17,
  reverseValue: false,
  delayed: 0
}

var debug= false

this.pir = new Pir(this.config, callback, debug)

this.pir.start()
setTimeout(() => { this.pir.stop() } , 5000)

function callback(status, err) {
  console.log("[PIR:CALLBACK] Status: " + status)
  if (err) console.log("[PIR:CALLBACK] " + err)
}
```

## constructor of pir

Pir(pirConfig, callback, debug)

### pirConfig {}

- `gpio` - BCM-number of the sensor pin.
- `reverseValue` -  reverse presence detector value.
- `delayed` - send presence callback after defined delayed time (ms)

### callback (status,error)

*callback return with event status:*

- `PIR_INITIALIZED`: Pir constructor is initialized 
- `PIR_STARTED`: Pir start detection confirmation
- `PIR_STOP`: pir stop detection confirmation
- `PIR_DETECTED`: pir user presence detected
- `PIR_ERROR`: pir error

*callback `error` return with `PIR_ERROR`*

if error detected, it will return it with error value
 
### debug

if you want debuging information, just set to `true`

## Functions
 * `start()` : start pir
 * `stop()` : force stop pir
