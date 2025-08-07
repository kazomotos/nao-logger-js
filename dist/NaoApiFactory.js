"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoApiFactory = void 0;
const NaoApiIntegrator_1 = require("./NaoApiIntegrator");
const NaoInfluxWriter_1 = require("./NaoInfluxWriter");
class NaoApiFactory {
    constructor(connector) {
        this.connector = connector;
        this.integrator = new NaoApiIntegrator_1.NaoApiIntegrator(connector);
        this.init();
    }
    init() {
        this.instances = this.integrator.getApi("/api/nao/instance");
        this.assets = this.integrator.getApi("/api/nao/asset");
        this.workspaces = this.integrator.getApi("/api/nao/workspace");
        this.influx = new NaoInfluxWriter_1.NaoInfluxWriter(this.connector);
    }
}
exports.NaoApiFactory = NaoApiFactory;
