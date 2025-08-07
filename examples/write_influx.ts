import { NaoConnector } from "../src/NaoConnector";
import { NaoApiFactory } from "../src/NaoApiFactory";

const connector = new NaoConnector(
  "https://nao-host.de",
  "user@example.com",
  "pass123"
);
const nao = new NaoApiFactory(connector);

await nao.influx.write([
  {
    assetId: "abc123",
    instanceId: "inst01",
    seriesId: "sensor.temp",
    value: 47.3,
    time: new Date().toISOString(),
  },
  {
    assetId: "abc123",
    instanceId: "inst01",
    seriesId: "sensor.flow",
    value: 19.8,
  },
]);
