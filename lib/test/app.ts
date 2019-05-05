
import { Sa44b, saStatus } from "../../src/sa44b";


// setTimeout(() => { console.log('keepalinve') }, 10000);


var device = new Sa44b();

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
device.ConfigAcquisition(Sa44b.sa_AVERAGE, Sa44b.sa_LOG_SCALE);
device.ConfigCenterSpan(Center, Span);
device.ConfigSweepCoupling(10.0e3, 10.0e3, 0.001, Sa44b.sa_NON_NATIVE_RBW, Sa44b.sa_NO_SPUR_REJECT);
device.ConfigProcUnits(Sa44b.sa_LOG);
var status = device.Initiate(Sa44b.sa_SWEEPING, 0);
if (status !== saStatus.saNoError) {
    console.log("Error: Unable to initialize Analyzer");
}

var sweepInfo = device.QuerySweepInfo();
var points = device.GetSweep_32f(sweepInfo);

console.log(points[0]);

console.log(sweepInfo);
var oko = 10;










