export declare enum saStatus {
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
    saNoError = 0,
    saAdjustedParameter = 1,
    saADCOverflow = 2,
    saNoTriggerFound = 3,
    saClampedToUpperLimit = 4,
    saClampedToLowerLimit = 5,
    saUncalibratedDevice = 6
}
export declare class Sa44b {
    static sa_DEVICE_sa124B: number;
    static sa_DEVICE_sa44B: number;
    static sa_AUTO_ATTEN: number;
    static sa_AUTO_GAIN: number;
    static sa_MIN_AND_MAX: number;
    static sa_AVERAGE: number;
    static sa_MIN_ONLY: number;
    static sa_MAX_ONLY: number;
    static sa_LOG_SCALE: number;
    static sa_LIN_SCALE: number;
    static sa_LOG_FULL_SCALE: number;
    static sa_LIN_FULL_SCALE: number;
    static sa_NATIVE_RBW: number;
    static sa_NON_NATIVE_RBW: number;
    static sa_NO_SPUR_REJECT: number;
    static sa_SPUR_REJECT: number;
    static sa_NUTALL: number;
    static sa_BLACKMAN: number;
    static sa_HAMMING: number;
    static sa_FLAT_TOP: number;
    static sa_LOG: number;
    static sa_VOLTAGE: number;
    static sa_POWER: number;
    static sa_SAMPLE: number;
    static sa_MIN_DECIMATION: number;
    static sa_MAX_DECIMATION: number;
    static sa_SWEEPING: number;
    static sa_REAL_TIME: number;
    static sa_STREAMING: number;
    static sa_AUDIO_DEMOD: number;
    static sa_STREAM_IQ: number;
    static sa_STREAM_IF: number;
    static sa_PORT1_AC_COUPLED: number;
    static sa_PORT1_DC_COUPLED: number;
    static sa_PORT1_INT_REF_OUT: number;
    static sa_PORT1_EXT_REF_IN: number;
    static sa_PORT1_OUT_AC_LOAD: number;
    static sa_PORT1_OUT_LOGIC_LOW: number;
    static sa_PORT1_OUT_LOGIC_HIGH: number;
    static sa_PORT2_OUT_LOGIC_LOW: number;
    static sa_PORT2_OUT_LOGIC_HIGH: number;
    static sa_PORT2_IN_TRIGGER_RISING_EDGE: number;
    static sa_PORT2_IN_TRIGGER_FALLING_EDGE: number;
    constructor();
    api: any;
    handle: number;
    InitFFI(): void;
    generateMethodObject(methodsObjectDescription: string[]): {};
    toHexString(byteArray: number[]): string;
    Open(): saStatus.saNoError;
    GetApiVersion(): any;
    GetDeviceName(): "sa44B" | "sa124B" | "Unknown device";
    GetSerialString(): string;
    GetFirmwareVersion(): string;
    QueryDiagnostics(): number;
    ConfigLevel(refLevel: number): saStatus;
    ConfigAcquisition(detector: number, scale: number): saStatus;
    ConfigCenterSpan(center: number, span: number): saStatus;
    ConfigSweepCoupling(rbw: number, vbw: number, sweepTime: number, rbw_type: number, rejection: number): saStatus;
    ConfigProcUnits(units: number): saStatus;
    Initiate(mode: number, flag: number): saStatus;
    QuerySweepInfo(): SweepInfo;
    GetSweep_32f(sweepInfo: SweepInfo): Point[];
}
export declare class SweepInfo {
    traceLen: number;
    start: number;
    bin_size: number;
    constructor(traceLen: number, start: number, bin_size: number);
}
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
