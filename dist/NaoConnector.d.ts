export declare class NaoConnector {
    private readonly host;
    private readonly email;
    private readonly password;
    private client;
    private token;
    private retries;
    private static readonly MAX_RETRIES;
    constructor(host: string, email: string, password: string);
    private login;
    private request;
    get<T>(route: string, params?: any): Promise<T | null>;
    post<T>(route: string, body: any, params?: any): Promise<T | null>;
    patch<T>(route: string, body: any, params?: any): Promise<T | null>;
    delete<T>(route: string, params?: any): Promise<T | null>;
}
