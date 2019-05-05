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

    // Configuring Device For a Sweep
    var RefLevel = 20;
    var Center = 1.0e9;
    var Span = 10.0e6;

    device.ConfigLevel(RefLevel);
    device.ConfigAcquisition(sa44b.Sa44b.sa_AVERAGE, sa44b.Sa44b.sa_LOG_SCALE);
    device.ConfigCenterSpan(Center, Span);
    device.ConfigSweepCoupling(10.0e3, 10.0e3, 0.001, sa44b.Sa44b.sa_NON_NATIVE_RBW, sa44b.Sa44b.sa_NO_SPUR_REJECT);
    device.ConfigProcUnits(sa44b.Sa44b.sa_LOG);
    var status = device.Initiate(sa44b.Sa44b.sa_SWEEPING, 0);
    if (status !== saStatus.saNoError) {
        console.log("Error: Unable to initialize Analyzer");
    }

    var sweepInfo = device.QuerySweepInfo();
    var points = device.GetSweep_32f(sweepInfo);

    console.log(points[0]);


```
