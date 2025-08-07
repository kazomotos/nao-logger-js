import { NaoConnector } from "../NaoConnector";
import { NaoApiFactory } from "../NaoApiFactory";

const connector = new NaoConnector(
  "https://nao-server.com",
  "user@example.com",
  "password123"
);
const nao = new NaoApiFactory(connector);

async function loadInstancesByAsset(assetId: string) {
  const query = {
    query: `_asset=${assetId}`, // entspricht Mongo-Filter: { _asset: assetId }
  };

  const result = await nao.instances.getAll(query);
  if (result) {
    console.log("Gefundene Instanzen:", result.results);
  } else {
    console.error("Instanzen konnten nicht geladen werden");
  }
}
