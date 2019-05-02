import sa44b = require("../../src/sa44b");

var device = new sa44b.Sa44b();

var stat = device.Open();
var ver = device.GetApiVersion();
var name = device.GetDeviceName();
var sn = device.GetSerialString();
var fw = device.GetFirmwareVersion();
var voltage = device.QueryDiagnostics();

// Configuring Device For a Sweep

var  oko=10;








