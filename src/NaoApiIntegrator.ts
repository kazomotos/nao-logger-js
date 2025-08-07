import { NaoConnector } from "./NaoConnector";

export interface CrudApi<T> {
  getAll: (
    query?: Record<string, any>
  ) => Promise<{ results: T[]; count: number } | null>;
  findById: (id: string, query?: Record<string, any>) => Promise<T | null>;
  create: (data: T) => Promise<T | null>;
  createMany: (data: T[]) => Promise<T[] | null>;
  update: (id: string, data: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<null>;

  // Subdocuments
  findSubdocuments: (
    id: string,
    field: string,
    query?: Record<string, any>
  ) => Promise<{ results: any[]; count: number } | null>;

  createSubdocument: (id: string, field: string, item: any) => Promise<any>;
  createSubdocumentsById: (
    id: string,
    field: string,
    items: any[]
  ) => Promise<any>;
  updateSubdocument: (
    id: string,
    field: string,
    docId: string,
    item: any
  ) => Promise<any>;
  removeSubdocument: (
    id: string,
    field: string,
    fieldId: string
  ) => Promise<any>;
}

export class NaoApiIntegrator {
  constructor(private connector: NaoConnector) {}

  public getApi<T extends object = any>(route: string): CrudApi<T> {
    return {
      getAll: (query) => this.connector.get(`${route}`, query),
      findById: (id, query) => this.connector.get(`${route}/${id}`, query),
      create: (data) => this.connector.post(route, data),
      createMany: (data) => this.connector.post(`${route}/many`, data),
      update: (id, data) => this.connector.patch(`${route}/${id}`, data),
      remove: (id) => this.connector.delete(`${route}/${id}`),

      findSubdocuments: (id, field, query) =>
        this.connector.get(`${route}/find/field/${id}/${field}`, query),
      createSubdocument: (id, field, item) =>
        this.connector.post(`${route}/${id}/${field}`, item),
      createSubdocumentsById: (id, field, items) =>
        this.connector.post(`${route}/${id}/${field}/many`, items),
      updateSubdocument: (id, field, docId, item) =>
        this.connector.patch(`${route}/${id}/${field}/${docId}`, item),
      removeSubdocument: (id, field, fieldId) =>
        this.connector.delete(`${route}/${id}/${field}/${fieldId}`),
    };
  }
}
