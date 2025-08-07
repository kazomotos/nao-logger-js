# 📦 nao-connector

> Einfacher Zugriff auf die NAO REST API und InfluxDB-Datenlogging über Telegraf.

Mit `nao-connector` kannst du authentifizierte Anfragen an die NAO-Plattform stellen und Datenpunkte effizient im Influx Line Protocol über einen Telegraf-Endpunkt schreiben.

---

## ✨ Features

- 🧠 Authentifizierter Zugriff über NAO-Login
- 📚 Generische CRUD-API für beliebige Datenmodelle
- 🔗 Unterstützung von Subdokumenten (z. B. Attribute von Assets)
- 📡 Logging von Zeitreihendaten via Telegraf-Ingress
- 🔐 Automatisches Token-Handling

---

## 📥 Installation

```bash
npm install nao-connector
```


## 🚀 Quickstart
```bash
import { NaoConnector, NaoApiFactory } from "nao-connector";

const connector = new NaoConnector("https://nao-host.de", "email@example.com", "your-password");
const nao = new NaoApiFactory(connector);

// Beispiel: Instanzen abrufen
const instances = await nao.instances.getAll({
  query: "_asset=1234567890abcdef"
});

// Beispiel: Attribute (Subdokumente) eines Assets abrufen
const attributes = await nao.assets.findSubdocuments("assetId123", "attributevalues");
```

## 🧾 Influx Logging via Telegraf
```bash
await nao.influx.write([
  {
    assetId: "kessel-1",          // → Measurement
    instanceId: "inst-xyz",       // → Tag
    seriesId: "VLTemp",           // → Field name
    value: 74.5,                  // → Field value
    time: new Date().toISOString() // → Optional Timestamp
  }
]);
```

## 🧱 Typen
Du kannst deine Typen pro API-Aufruf explizit angeben:
```bash
const api = nao.integrator.getApi<{ name: string; type: string }>("/api/asset");
```

Oder die Factory verwenden, die für viele NAO-Endpunkte bereits vorbereitet ist:
```bash
nao.instances.create({ name: "Neue Instanz" });
```

## 📤 API Übersicht (via Factory)

```bash
nao.instances        // /api/instance
nao.assets           // /api/asset
nao.workspaces       // /api/workspace
nao.attributes       // /api/attribute
nao.influx           // /api/telegraf (Telegraf-Logging)
```
