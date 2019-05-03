import * as ffi from 'ffi';
import * as ref from 'ref';
import * as Struct from 'ref-struct';
import * as ArrayType from 'ref-array';

export enum saStatus {
    // Configuration Errors
    saInvalidModeErr = -112,
    saReferenceLevelErr = -111,
    saInvalidVideoUnitsErr = -110,
    saInvalidWindowErr = -109,
    saInvalidBandwidthTypeErr = -108,
    saInvalidSweepTimeErr = -107,
    saBandwidthErr = -106,
    saInvalidGainErr = -105,
    saAttenuationErr = -104,
    saFrequencyRangeErr = -103,
    saInvalidSpanErr = -102,
    saInvalidScaleErr = -101,
    saInvalidDetectorErr = -100,

    // General Errors
    saUSBTimeoutErr = -15,
    saDeviceConnectionErr = -14,
    saPacketFramingErr = -13,
    saGPSErr = -12,
    saGainNotSetErr = -11,
    saDeviceNotIdleErr = -10,
    saDeviceInvalidErr = -9,
    saBufferTooSmallErr = -8,
    saNullPtrErr = -7,
    saAllocationLimitErr = -6,
    saDeviceAlreadyStreamingErr = -5,
    saInvalidParameterErr = -4,
    saDeviceNotConfiguredErr = -3,
    saDeviceNotStreamingErr = -2,
    saDeviceNotOpenErr = -1,

    // No Error
    saNoError = 0,

    // Warnings/Messages
    saAdjustedParameter = 1,
    saADCOverflow = 2,
    saNoTriggerFound = 3,
    saClampedToUpperLimit = 4,
    saClampedToLowerLimit = 5,
    saUncalibratedDevice = 6
};

export class Sa44b {

    // saGetDeviceType : type
    static sa_DEVICE_sa124B = 0x4;
    static sa_DEVICE_sa44B = 0x2;
    // saConfigureLevel : atten
    static sa_AUTO_ATTEN = -1;
    // saConfigureGain : gain
    static sa_AUTO_GAIN = -1;
    // saConfigAcquisition : detector
    static sa_MIN_AND_MAX = 0x0;
    static sa_AVERAGE = 0x1;
    static sa_MIN_ONLY = 0x2;
    static sa_MAX_ONLY = 0x3;
    // saConfigAcquisition : scale
    static sa_LOG_SCALE = 0x0;
    static sa_LIN_SCALE = 0x1;
    static sa_LOG_FULL_SCALE = 0x2;
    static sa_LIN_FULL_SCALE = 0x3;
    // saConfigureSweepCoupling : rbwType
    static sa_NATIVE_RBW = 0x0;
    static sa_NON_NATIVE_RBW = 0x1;
    // saConfigureSweepCoupling : rejection
    static sa_NO_SPUR_REJECT = 0x0;
    static sa_SPUR_REJECT = 0x1;
    // saConfigureWindow : window
    static sa_NUTALL = 0x0;
    static sa_BLACKMAN = 0x1;
    static sa_HAMMING = 0x2;
    static sa_FLAT_TOP = 0x3;
    // saConfigureProcUnits : units
    static sa_LOG = 0x0;
    static sa_VOLTAGE = 0x1;
    static sa_POWER = 0x2;
    static sa_SAMPLE = 0x3;
    // saConfigureIQ : downsampleFactor
    static sa_MIN_DECIMATION = 1; // 2 ^ 0
    static sa_MAX_DECIMATION = 128; // 2 ^ 7
    // saInitiate : mode
    static sa_SWEEPING = 0x0;
    static sa_REAL_TIME = 0x1;
    static sa_STREAMING = 0x4;
    static sa_AUDIO_DEMOD = 0x7;
    // saInitiate : flag
    static sa_STREAM_IQ = 0x0;
    static sa_STREAM_IF = 0x1;
    // saConfigureIO : port1
    static sa_PORT1_AC_COUPLED = 0x00;
    static sa_PORT1_DC_COUPLED = 0x04;
    static sa_PORT1_INT_REF_OUT = 0x00;
    static sa_PORT1_EXT_REF_IN = 0x08;
    static sa_PORT1_OUT_AC_LOAD = 0x10;
    static sa_PORT1_OUT_LOGIC_LOW = 0x14;
    static sa_PORT1_OUT_LOGIC_HIGH = 0x1C;
    // saConfigureIO : port2
    static sa_PORT2_OUT_LOGIC_LOW = 0x00;
    static sa_PORT2_OUT_LOGIC_HIGH = 0x20;
    static sa_PORT2_IN_TRIGGER_RISING_EDGE = 0x40;
    static sa_PORT2_IN_TRIGGER_FALLING_EDGE = 0x60;

    constructor() {
        this.InitFFI();
        this.handle = 0;
    }

    api: any;
    handle: number = -1;





    InitFFI() {
        var intPtr = ref.refType('int');
        var uintPtr = ref.refType('uint');
        var floatPtr = ref.refType('float');

        var RTLD_GLOBAL = ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL;

        var api_methods_desc = [
            "public static extern saStatus saOpenDevice(ref int device)",
            "private static extern IntPtr saGetAPIVersion();",
            "public static extern saStatus saGetDeviceType(int device, ref int type)",
            "public static extern saStatus saGetSerialNumber(int device, ref uint serial_number);",
            "public static extern saStatus saGetFirmwareString(int device, ref int version);",
            "public static extern saStatus saQueryDiagnostics(int device, ref float usbVoltage);",
            "public static extern saStatus saConfigLevel(int device, double ref_level);",
            "public static extern saStatus saConfigAcquisition(int device,uint detector, uint scale);",
            "public static extern saStatus saConfigCenterSpan(int device,double center, double span);",
            `public static extern saStatus saConfigSweepCoupling(int device,double rbw, double vbw, double sweepTime, uint rbw_type, uint rejection);`,
            "public static extern saStatus saConfigProcUnits(int device, uint units);",
            `public static extern saStatus saInitiate(int device,uint mode, uint flag);`,
            "private static extern IntPtr saGetErrorString(saStatus status);",
        ];


        var methods_obj = this.generateMethodObject(api_methods_desc);

        this.api = ffi.Library(__dirname + './sa_api.dll', methods_obj);

        var a = 10;
    }

    generateMethodObject(methodsObjectDescription: string[]) {
        var methods_obj = {}
        for (var method_desc of methodsObjectDescription) {
            var method_desc_split = method_desc.trim().split(' ');
            // removes the first three letters..
            for (var i = 0; i < 3; i++) method_desc_split.shift();

            // get return value
            var retrunValue = method_desc_split[0].trim();
            var retrunValueObj = "";
            switch (retrunValue) {
                case "saStatus":
                    retrunValueObj = 'byte';
                    break;
                case "IntPtr":
                    retrunValueObj = 'string';
                    break;
            }

            // method name
            var method_name = method_desc_split[1].split('(')[0].trim();

            // args
            // remove return type
            method_desc_split.shift();
            var methodNameAndArgs = method_desc_split.join(' ');

            // remove method name
            var args = [];
            var argsOnly = methodNameAndArgs.replace(method_name, "").replace('(', '').replace(')', '').replace(';', '').trim();
            if (argsOnly !== "") {
                var argsOnly_split = argsOnly.split(',');
                for (var arg of argsOnly_split) {
                    var arg_split = arg.trim().split(' ');
                    if (arg_split.length === 2) {
                        // no ref
                        var argType = arg_split[0].trim();
                        if (argType === "saStatus") argType = 'byte';
                        args.push(argType);
                    }
                    else {
                        // ref
                        var refTypeName = arg_split[1];
                        var ptr = ref.refType(refTypeName);
                        args.push(ptr);
                    }
                }

            }

            methods_obj[method_name] = [retrunValueObj, args];
            console.log(retrunValueObj + " " + method_name + " " + JSON.stringify(args));

        }

        return methods_obj;
    }

    toHexString(byteArray: number[]) {
        return Array.from(byteArray, function (byte) {
            return ('0x0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join(',')
    }

    Open() {
        var dev = ref.alloc('int') as any;

        var status = this.api.saOpenDevice(dev) as saStatus;
        if (status != saStatus.saNoError) {
            console.log("Error: Unable to open sa");
            //   console.log(sa_api.saGetStatusString(status));
            //   prompt_user_input();
            return;
        }
        else {
            this.handle = dev[0];
            console.log("Device Found : " + this.handle);
        }

        return status;
    }

    GetApiVersion() {
        return this.api.saGetAPIVersion();
    }




    GetDeviceName() {
        var device_type = -1;
        var device_type_Ref = ref.alloc('int') as any;
        this.api.saGetDeviceType(this.handle, device_type_Ref)
        device_type = device_type_Ref[0];

        if (device_type === Sa44b.sa_DEVICE_sa44B)
            return "sa44B";
        if (device_type === Sa44b.sa_DEVICE_sa124B)
            return "sa124B";

        return "Unknown device";
    }

    GetSerialString() {
        var serial_number = ref.alloc('uint') as any;

        if (this.api.saGetSerialNumber(this.handle, serial_number) === saStatus.saNoError) {
            var buf = serial_number as Buffer;
            return buf.readUInt32LE(0).toString();
        }

        return "";
    }

    GetFirmwareVersion() {
        var firmware_version = ref.alloc('int') as any;
        if (this.api.saGetFirmwareString(this.handle, firmware_version) === saStatus.saNoError)
            return (firmware_version as Buffer).readInt32LE(0).toString();

        return "";
    }

    QueryDiagnostics() {
        var voltage = ref.alloc('float') as any;

        this.api.saQueryDiagnostics(this.handle, voltage);

        return (voltage as Buffer).readFloatLE(0);
    }

    ConfigLevel(refLevel: number) {
        return this.api.saConfigLevel(this.handle, refLevel) as saStatus;
    }

    ConfigAcquisition(detector: number, scale: number) {
        return this.api.saConfigAcquisition(this.handle, detector, scale) as saStatus;
    }

    ConfigCenterSpan(center: number, span: number) {
        return this.api.saConfigCenterSpan(this.handle, center, span) as saStatus;
    }

    ConfigSweepCoupling(rbw: number, vbw: number, sweepTime: number, rbw_type: number, rejection: number) {
        return this.api.saConfigSweepCoupling(this.handle, rbw, vbw, sweepTime, rbw_type, rejection) as saStatus;
    }

    ConfigProcUnits(units: number) {
        return this.api.saConfigProcUnits(this.handle, units) as saStatus;

    }

    Initiate(mode: number, flag: number) {
        return this.api.saInitiate(this.handle, mode, flag) as saStatus;
    }






}