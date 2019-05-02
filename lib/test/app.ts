import sa44b = require("../../src/sa44b");

var device = new sa44b.Sa44b();

var stat = device.Open();
var ver = device.GetApiVersion();
var name = device.GetDeviceName();
var sn = device.GetSerialString();
var fw = device.GetFirmwareVersion();
var voltage = device.QueryDiagnostics();

// Configuring Device For a Sweep
var RefLevel = 20;
var Center = 1.0e9;
var Span = 10.0e6;

device.ConfigLevel(RefLevel);
device.ConfigAcquisition(sa44b.Sa44b.sa_AVERAGE,sa44b.Sa44b.sa_LOG_SCALE);
device.saConfigCenterSpan(Center,Span);


var  oko=10;








