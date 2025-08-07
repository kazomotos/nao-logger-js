import { NaoConnector } from "../NaoConnector";
import { NaoApiFactory } from "../NaoApiFactory";

const connector = new NaoConnector(
  "https://nao-server.com",
  "user@example.com",
  "password123"
);
const nao = new NaoApiFactory(connector);

async function loadAttributesOfAsset(assetId: string) {
  const field = "attributevalues"; // oder wie das Subdocument-Feld tatsächlich im Model heißt
  const result = await nao.assets.findSubdocuments(assetId, field, {
    sortBy: "name",
    limit: 50,
    page: 1,
  });

  if (result) {
    console.log("Attribute gefunden:", result.results);
  } else {
    console.error("Attribute konnten nicht geladen werden");
  }
}
