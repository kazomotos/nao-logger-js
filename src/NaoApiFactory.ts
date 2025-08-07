import { NaoConnector } from "./NaoConnector";
import { NaoApiIntegrator } from "./NaoApiIntegrator";
import { NaoInfluxWriter } from "./NaoInfluxWriter";
import { CrudApi } from "./NaoApiIntegrator";

export class NaoApiFactory {
  private integrator: NaoApiIntegrator;

  public instances!: CrudApi<{ name: string; description?: string }>;
  public assets!: CrudApi<{ name: string; type: string }>;
  public workspaces!: CrudApi<{ name: string; assetId: string }>;
  public attributes!: CrudApi<{ name: string; unit?: string }>;

  public influx!: NaoInfluxWriter;

  constructor(private connector: NaoConnector) {
    this.integrator = new NaoApiIntegrator(connector);
    this.init();
  }

  private init() {
    this.instances = this.integrator.getApi<{
      name: string;
      description?: string;
    }>("/api/nao/instance");
    this.assets = this.integrator.getApi<{
      name: string;
      type: string;
    }>("/api/nao/asset");
    this.workspaces = this.integrator.getApi<{ name: string; assetId: string }>(
      "/api/nao/workspace"
    );
    this.influx = new NaoInfluxWriter(this.connector);
  }
}
