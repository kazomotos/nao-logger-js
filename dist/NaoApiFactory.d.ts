import { NaoConnector } from "./NaoConnector";
import { NaoInfluxWriter } from "./NaoInfluxWriter";
import { CrudApi } from "./NaoApiIntegrator";
export declare class NaoApiFactory {
    private connector;
    private integrator;
    instances: CrudApi<{
        name: string;
        description?: string;
    }>;
    assets: CrudApi<{
        name: string;
        type: string;
    }>;
    workspaces: CrudApi<{
        name: string;
        assetId: string;
    }>;
    attributes: CrudApi<{
        name: string;
        unit?: string;
    }>;
    influx: NaoInfluxWriter;
    constructor(connector: NaoConnector);
    private init;
}
