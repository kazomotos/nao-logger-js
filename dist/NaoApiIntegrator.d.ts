import { NaoConnector } from "./NaoConnector";
export interface CrudApi<T> {
    getAll: (query?: Record<string, any>) => Promise<{
        results: T[];
        count: number;
    } | null>;
    findById: (id: string, query?: Record<string, any>) => Promise<T | null>;
    create: (data: T) => Promise<T | null>;
    createMany: (data: T[]) => Promise<T[] | null>;
    update: (id: string, data: Partial<T>) => Promise<T | null>;
    remove: (id: string) => Promise<null>;
    findSubdocuments: (id: string, field: string, query?: Record<string, any>) => Promise<{
        results: any[];
        count: number;
    } | null>;
    createSubdocument: (id: string, field: string, item: any) => Promise<any>;
    createSubdocumentsById: (id: string, field: string, items: any[]) => Promise<any>;
    updateSubdocument: (id: string, field: string, docId: string, item: any) => Promise<any>;
    removeSubdocument: (id: string, field: string, fieldId: string) => Promise<any>;
}
export declare class NaoApiIntegrator {
    private connector;
    constructor(connector: NaoConnector);
    getApi<T extends object = any>(route: string): CrudApi<T>;
}
