export declare class DevasysI2C {
    constructor(showDebugInfo?: boolean);
    libi2c: any;
    handle: number;
    showDebugInfo: boolean;
    DAPI_I2C_TRANS_DAMP: any;
    InitFFI(): void;
    private ToHexString;
    ReadI2C(devAddr: number, numOfBytes: number): number[];
    WriteI2C(devAddr: number, data: number[]): number;
    Open(): void;
    GetDllVersion(): any;
    GetFWVersion(): any;
}
