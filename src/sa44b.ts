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
        this.Open();
        this.handle = 0;
    }

    api: any;
    handle: number = -1;





    InitFFI() {
        var int16Ptr = ref.refType('int16');

        this.api = ffi.Library('sa_api', {
            //  static extern saStatus saOpenDevice(ref int device);
            'saOpenDevice': ['int', ['int']],

            // private static extern IntPtr saGetAPIVersion();
            'saGetAPIVersion': ['string', []],


        });
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
            console.log("Device Found");
        }

        return status;
    }

    GetApiVersion() {
        return this.api.saGetAPIVersion();
    }

    GetFWVersion() {
        var version = ref.alloc('int16') as any;
        return this.api.DAPI_GetFirmwareVersion(this.handle, version);
    }

}