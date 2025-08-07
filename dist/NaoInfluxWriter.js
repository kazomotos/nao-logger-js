"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoInfluxWriter = void 0;
class NaoInfluxWriter {
    constructor(connector) {
        this.connector = connector;
    }
    toLineProtocol(data) {
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
    async write(data) {
        const lineProtocol = this.toLineProtocol(data);
        await this.connector.post("/api/telegraf", lineProtocol, {
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}
exports.NaoInfluxWriter = NaoInfluxWriter;
