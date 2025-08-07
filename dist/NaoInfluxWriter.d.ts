import { NaoConnector } from "./NaoConnector";
export type InfluxDataPoint = {
    assetId: string;
    instanceId: string;
    seriesId: string;
    value: number;
    time?: string;
};
export declare class NaoInfluxWriter {
    private connector;
    constructor(connector: NaoConnector);
    private toLineProtocol;
    write(data: InfluxDataPoint[]): Promise<void>;
}
