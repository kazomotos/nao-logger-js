import { NaoConnector } from "./NaoConnector";

export type InfluxDataPoint = {
  assetId: string;
  instanceId: string;
  seriesId: string;
  value: number;
  time?: string;
};

export class NaoInfluxWriter {
  constructor(private connector: NaoConnector) {}

  private toLineProtocol(data: InfluxDataPoint[]): string {
    return data
      .map(({ assetId, instanceId, seriesId, value, time }) => {
        const escapedMeasurement = assetId.replace(/ /g, "\\ ");
        const escapedTag = instanceId.replace(/ /g, "\\ ");
        const escapedField = seriesId.replace(/ /g, "\\ ");
        const timestamp = time ? ` ${Date.parse(time) * 1e6}` : new Date();

        return `${escapedMeasurement},instance=${escapedTag} ${escapedField}=${value} ${timestamp}`;
      })
      .join("\n");
  }

  public async write(data: InfluxDataPoint[]): Promise<void> {
    const lineProtocol = this.toLineProtocol(data);

    await this.connector.post("/api/telegraf", lineProtocol, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
