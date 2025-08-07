"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoConnector = void 0;
const axios_1 = __importDefault(require("axios"));
class NaoConnector {
    constructor(host, email, password) {
        this.host = host;
        this.email = email;
        this.password = password;
        this.token = null;
        this.retries = 0;
        this.client = axios_1.default.create({
            baseURL: host,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    async login() {
        const url = "api/user/auth/login";
        const payload = new URLSearchParams({
            email: this.email,
            password: this.password,
        });
        try {
            const response = await this.client.post(url, payload, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            this.token = response.data.accessToken;
            this.client.defaults.headers.Authorization = `Bearer ${this.token}`;
        }
        catch (err) {
            throw new Error(`Login failed: ${err.message}`);
        }
    }
    async request(method, url, data, config = {}) {
        if (!this.token) {
            await this.login();
        }
        try {
            const requestConfig = {
                method,
                url,
                ...config,
                headers: {
                    ...(config.headers || {}),
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json", // oder text/plain je nach Route
                },
            };
            // Nur bei POST, PATCH, DELETE → Body übergeben
            if (method !== "get" && data !== undefined) {
                requestConfig.data = data;
            }
            const response = await this.client.request(requestConfig);
            this.retries = 0;
            return response.data;
        }
        catch (err) {
            if (err.response?.status === 401 &&
                this.retries < NaoConnector.MAX_RETRIES) {
                this.retries++;
                await this.login();
                return this.request(method, url, data, config);
            }
            console.error(`${method.toUpperCase()} ${url} failed:`, err.message);
            return null;
        }
    }
    async get(route, params) {
        return this.request("get", route, null, { params });
    }
    async post(route, body, params) {
        return this.request("post", route, body, { params });
    }
    async patch(route, body, params) {
        return this.request("patch", route, body, { params });
    }
    async delete(route, params) {
        return this.request("delete", route, null, { params });
    }
}
exports.NaoConnector = NaoConnector;
NaoConnector.MAX_RETRIES = 5;
