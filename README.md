sa44b Driver For NodeJS

## Installation
```
npm i sa44b --save
```

## Usage

```
import sa44b = require("sa44b");

var device = new sa44b.Sa44b();

var stat = device.Open();
var ver = device.GetApiVersion();
var name = device.GetDeviceName();
var sn = device.GetSerialString();
var fw = device.GetFirmwareVersion();
var voltage = device.QueryDiagnostics();


```
