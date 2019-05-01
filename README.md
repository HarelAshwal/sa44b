sa44b Driver For NodeJS


## Installation
```
npm i sa44b --save
```

## Usage

```
import sa44b = require("sa44b");

var device = new sa44b.Sa44b();

// Get Dll Version
var dllVersion = device.GetDllVersion();
console.log('dllVersion :' + dllVersion);

// Open device
device.Open();

// WriteI2C
// first parameter - i2c address,
// second parameter - array of bytes to write
device.WriteI2C(0xF0, [0x10, 0xE0]);
device.WriteI2C(0xF0, [0x21]);

// ReadI2C
// first parameter - i2c address
// second parameter - number of bytes to read
// returns array of bytes with result

var result = device.ReadI2C(0xF0, 1);



```
