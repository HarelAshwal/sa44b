
import { Sa44b, saStatus } from "../sa44b";

const DELAY = 0;

async function Delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function Main() {

    var device = new Sa44b();

    var stat = device.Open();
    console.log("Opened " + saStatus[stat]);

    await Delay(DELAY);

    var ver = device.GetApiVersion();
    await Delay(DELAY);

    var name = device.GetDeviceName();
    await Delay(DELAY);

    var sn = device.GetSerialString();
    await Delay(DELAY);

    var fw = device.GetFirmwareVersion();
    await Delay(DELAY);

    var voltage = device.QueryDiagnostics();
    await Delay(DELAY);
    console.log("Got voltage : " + voltage);

    // Configuring Device For a Sweep
    var RefLevel = 20;
    var Center = 1.0e9;
    var Span = 10.0e6;


    device.ConfigLevel(RefLevel);
    await Delay(DELAY);
    console.log('level ' + RefLevel);

    device.ConfigAcquisition(Sa44b.sa_AVERAGE, Sa44b.sa_LOG_SCALE);
    await Delay(DELAY);

    device.ConfigCenterSpan(Center, Span);
    await Delay(DELAY);

    device.ConfigSweepCoupling(10.0e3, 10.0e3, 0.001, Sa44b.sa_NON_NATIVE_RBW, Sa44b.sa_NO_SPUR_REJECT);
    await Delay(DELAY);

    device.ConfigProcUnits(Sa44b.sa_LOG);
    await Delay(DELAY);

    var status = device.Initiate(Sa44b.sa_SWEEPING, 0);
    await Delay(DELAY);
    if (status !== saStatus.saNoError) {
        console.log("Error: Unable to initialize Analyzer");
    }

    var sweepInfo = device.QuerySweepInfo();
    await Delay(DELAY);

    var points = device.GetSweep_32f(sweepInfo);

    console.log(points[0]);

    console.log(sweepInfo);
    var oko = 10;

}

Main();








