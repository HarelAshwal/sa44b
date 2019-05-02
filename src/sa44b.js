"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ffi = require("ffi");
const ref = require("ref");
var saStatus;
(function (saStatus) {
    // Configuration Errors
    saStatus[saStatus["saInvalidModeErr"] = -112] = "saInvalidModeErr";
    saStatus[saStatus["saReferenceLevelErr"] = -111] = "saReferenceLevelErr";
    saStatus[saStatus["saInvalidVideoUnitsErr"] = -110] = "saInvalidVideoUnitsErr";
    saStatus[saStatus["saInvalidWindowErr"] = -109] = "saInvalidWindowErr";
    saStatus[saStatus["saInvalidBandwidthTypeErr"] = -108] = "saInvalidBandwidthTypeErr";
    saStatus[saStatus["saInvalidSweepTimeErr"] = -107] = "saInvalidSweepTimeErr";
    saStatus[saStatus["saBandwidthErr"] = -106] = "saBandwidthErr";
    saStatus[saStatus["saInvalidGainErr"] = -105] = "saInvalidGainErr";
    saStatus[saStatus["saAttenuationErr"] = -104] = "saAttenuationErr";
    saStatus[saStatus["saFrequencyRangeErr"] = -103] = "saFrequencyRangeErr";
    saStatus[saStatus["saInvalidSpanErr"] = -102] = "saInvalidSpanErr";
    saStatus[saStatus["saInvalidScaleErr"] = -101] = "saInvalidScaleErr";
    saStatus[saStatus["saInvalidDetectorErr"] = -100] = "saInvalidDetectorErr";
    // General Errors
    saStatus[saStatus["saUSBTimeoutErr"] = -15] = "saUSBTimeoutErr";
    saStatus[saStatus["saDeviceConnectionErr"] = -14] = "saDeviceConnectionErr";
    saStatus[saStatus["saPacketFramingErr"] = -13] = "saPacketFramingErr";
    saStatus[saStatus["saGPSErr"] = -12] = "saGPSErr";
    saStatus[saStatus["saGainNotSetErr"] = -11] = "saGainNotSetErr";
    saStatus[saStatus["saDeviceNotIdleErr"] = -10] = "saDeviceNotIdleErr";
    saStatus[saStatus["saDeviceInvalidErr"] = -9] = "saDeviceInvalidErr";
    saStatus[saStatus["saBufferTooSmallErr"] = -8] = "saBufferTooSmallErr";
    saStatus[saStatus["saNullPtrErr"] = -7] = "saNullPtrErr";
    saStatus[saStatus["saAllocationLimitErr"] = -6] = "saAllocationLimitErr";
    saStatus[saStatus["saDeviceAlreadyStreamingErr"] = -5] = "saDeviceAlreadyStreamingErr";
    saStatus[saStatus["saInvalidParameterErr"] = -4] = "saInvalidParameterErr";
    saStatus[saStatus["saDeviceNotConfiguredErr"] = -3] = "saDeviceNotConfiguredErr";
    saStatus[saStatus["saDeviceNotStreamingErr"] = -2] = "saDeviceNotStreamingErr";
    saStatus[saStatus["saDeviceNotOpenErr"] = -1] = "saDeviceNotOpenErr";
    // No Error
    saStatus[saStatus["saNoError"] = 0] = "saNoError";
    // Warnings/Messages
    saStatus[saStatus["saAdjustedParameter"] = 1] = "saAdjustedParameter";
    saStatus[saStatus["saADCOverflow"] = 2] = "saADCOverflow";
    saStatus[saStatus["saNoTriggerFound"] = 3] = "saNoTriggerFound";
    saStatus[saStatus["saClampedToUpperLimit"] = 4] = "saClampedToUpperLimit";
    saStatus[saStatus["saClampedToLowerLimit"] = 5] = "saClampedToLowerLimit";
    saStatus[saStatus["saUncalibratedDevice"] = 6] = "saUncalibratedDevice";
})(saStatus = exports.saStatus || (exports.saStatus = {}));
;
class Sa44b {
    constructor() {
        this.handle = -1;
        this.InitFFI();
        this.handle = 0;
    }
    InitFFI() {
        var intPtr = ref.refType('int');
        var uintPtr = ref.refType('uint');
        var floatPtr = ref.refType('float');
        var RTLD_GLOBAL = ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL;
        // this.api = ffi.DynamicLibrary(__dirname + './sa_api.dll');
        this.api = ffi.Library(__dirname + './sa_api.dll', {
            //  static extern saStatus saOpenDevice(ref int device);
            'saOpenDevice': ['byte', [intPtr]],
            // private static extern IntPtr saGetAPIVersion();
            'saGetAPIVersion': ['string', []],
            // public static extern saStatus saGetDeviceType(int device, ref int type);
            'saGetDeviceType': ['byte', ['int', intPtr]],
            // public static extern saStatus saGetSerialNumber(int device, ref uint serial_number);
            'saGetSerialNumber': ['byte', ['int', uintPtr]],
            // public static extern saStatus saGetFirmwareString(int device, ref int version);
            'saGetFirmwareString': ['byte', ['int', intPtr]],
            // public static extern saStatus saQueryDiagnostics(int device, ref float usbVoltage);
            'saQueryDiagnostics': ['byte', ['int', floatPtr]],
            //  public static extern saStatus saConfigLevel(int device, double ref_level);
            'saConfigLevel': ['byte', ['int', 'double']],
            //  public static extern saStatus saConfigAcquisition(int device,uint detector, uint scale);
            'saConfigAcquisition': ['byte', ['int', 'uint', 'uint']],
            //  public static extern saStatus saConfigCenterSpan(int device,double center, double span);
            'saConfigCenterSpan': ['byte', ['int', 'double', 'double']],
        });
        var a = 10;
    }
    toHexString(byteArray) {
        return Array.from(byteArray, function (byte) {
            return ('0x0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join(',');
    }
    Open() {
        var dev = ref.alloc('int');
        var status = this.api.saOpenDevice(dev);
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
        var device_type_Ref = ref.alloc('int');
        this.api.saGetDeviceType(this.handle, device_type_Ref);
        device_type = device_type_Ref[0];
        if (device_type === Sa44b.sa_DEVICE_sa44B)
            return "sa44B";
        if (device_type === Sa44b.sa_DEVICE_sa124B)
            return "sa124B";
        return "Unknown device";
    }
    GetSerialString() {
        var serial_number = ref.alloc('uint');
        if (this.api.saGetSerialNumber(this.handle, serial_number) === saStatus.saNoError) {
            var buf = serial_number;
            return buf.readUInt32LE(0).toString();
        }
        return "";
    }
    GetFirmwareVersion() {
        var firmware_version = ref.alloc('int');
        if (this.api.saGetFirmwareString(this.handle, firmware_version) === saStatus.saNoError)
            return firmware_version.readInt32LE(0).toString();
        return "";
    }
    QueryDiagnostics() {
        var voltage = ref.alloc('float');
        this.api.saQueryDiagnostics(this.handle, voltage);
        return voltage.readFloatLE(0);
    }
    ConfigLevel(refLevel) {
        return this.api.saConfigLevel(this.handle, refLevel);
    }
    ConfigAcquisition(detector, scale) {
        return this.api.saConfigAcquisition(this.handle, detector, scale);
    }
    saConfigCenterSpan(center, span) {
        return this.api.saConfigCenterSpan(this.handle, center, span);
    }
}
// saGetDeviceType : type
Sa44b.sa_DEVICE_sa124B = 0x4;
Sa44b.sa_DEVICE_sa44B = 0x2;
// saConfigureLevel : atten
Sa44b.sa_AUTO_ATTEN = -1;
// saConfigureGain : gain
Sa44b.sa_AUTO_GAIN = -1;
// saConfigAcquisition : detector
Sa44b.sa_MIN_AND_MAX = 0x0;
Sa44b.sa_AVERAGE = 0x1;
Sa44b.sa_MIN_ONLY = 0x2;
Sa44b.sa_MAX_ONLY = 0x3;
// saConfigAcquisition : scale
Sa44b.sa_LOG_SCALE = 0x0;
Sa44b.sa_LIN_SCALE = 0x1;
Sa44b.sa_LOG_FULL_SCALE = 0x2;
Sa44b.sa_LIN_FULL_SCALE = 0x3;
// saConfigureSweepCoupling : rbwType
Sa44b.sa_NATIVE_RBW = 0x0;
Sa44b.sa_NON_NATIVE_RBW = 0x1;
// saConfigureSweepCoupling : rejection
Sa44b.sa_NO_SPUR_REJECT = 0x0;
Sa44b.sa_SPUR_REJECT = 0x1;
// saConfigureWindow : window
Sa44b.sa_NUTALL = 0x0;
Sa44b.sa_BLACKMAN = 0x1;
Sa44b.sa_HAMMING = 0x2;
Sa44b.sa_FLAT_TOP = 0x3;
// saConfigureProcUnits : units
Sa44b.sa_LOG = 0x0;
Sa44b.sa_VOLTAGE = 0x1;
Sa44b.sa_POWER = 0x2;
Sa44b.sa_SAMPLE = 0x3;
// saConfigureIQ : downsampleFactor
Sa44b.sa_MIN_DECIMATION = 1; // 2 ^ 0
Sa44b.sa_MAX_DECIMATION = 128; // 2 ^ 7
// saInitiate : mode
Sa44b.sa_SWEEPING = 0x0;
Sa44b.sa_REAL_TIME = 0x1;
Sa44b.sa_STREAMING = 0x4;
Sa44b.sa_AUDIO_DEMOD = 0x7;
// saInitiate : flag
Sa44b.sa_STREAM_IQ = 0x0;
Sa44b.sa_STREAM_IF = 0x1;
// saConfigureIO : port1
Sa44b.sa_PORT1_AC_COUPLED = 0x00;
Sa44b.sa_PORT1_DC_COUPLED = 0x04;
Sa44b.sa_PORT1_INT_REF_OUT = 0x00;
Sa44b.sa_PORT1_EXT_REF_IN = 0x08;
Sa44b.sa_PORT1_OUT_AC_LOAD = 0x10;
Sa44b.sa_PORT1_OUT_LOGIC_LOW = 0x14;
Sa44b.sa_PORT1_OUT_LOGIC_HIGH = 0x1C;
// saConfigureIO : port2
Sa44b.sa_PORT2_OUT_LOGIC_LOW = 0x00;
Sa44b.sa_PORT2_OUT_LOGIC_HIGH = 0x20;
Sa44b.sa_PORT2_IN_TRIGGER_RISING_EDGE = 0x40;
Sa44b.sa_PORT2_IN_TRIGGER_FALLING_EDGE = 0x60;
exports.Sa44b = Sa44b;
//# sourceMappingURL=sa44b.js.map