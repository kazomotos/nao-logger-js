"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoApiIntegrator = void 0;
class NaoApiIntegrator {
    constructor(connector) {
        this.connector = connector;
    }
    getApi(route) {
        return {
            getAll: (query) => this.connector.get(`${route}`, query),
            findById: (id, query) => this.connector.get(`${route}/${id}`, query),
            create: (data) => this.connector.post(route, data),
            createMany: (data) => this.connector.post(`${route}/many`, data),
            update: (id, data) => this.connector.patch(`${route}/${id}`, data),
            remove: (id) => this.connector.delete(`${route}/${id}`),
            findSubdocuments: (id, field, query) => this.connector.get(`${route}/find/field/${id}/${field}`, query),
            createSubdocument: (id, field, item) => this.connector.post(`${route}/${id}/${field}`, item),
            createSubdocumentsById: (id, field, items) => this.connector.post(`${route}/${id}/${field}/many`, items),
            updateSubdocument: (id, field, docId, item) => this.connector.patch(`${route}/${id}/${field}/${docId}`, item),
            removeSubdocument: (id, field, fieldId) => this.connector.delete(`${route}/${id}/${field}/${fieldId}`),
        };
    }
}
exports.NaoApiIntegrator = NaoApiIntegrator;
