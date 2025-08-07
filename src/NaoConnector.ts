import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class NaoConnector {
  private client: AxiosInstance;
  private token: string | null = null;
  private retries = 0;
  private static readonly MAX_RETRIES = 5;

  constructor(
    private readonly host: string,
    private readonly email: string,
    private readonly password: string
  ) {
    this.client = axios.create({
      baseURL: host,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async login(): Promise<void> {
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
    } catch (err: any) {
      throw new Error(`Login failed: ${err.message}`);
    }
  }

  private async request<T>(
    method: "get" | "post" | "patch" | "delete",
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T | null> {
    if (!this.token) {
      await this.login();
    }

    try {
      const requestConfig: AxiosRequestConfig = {
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

      const response = await this.client.request<T>(requestConfig);
      this.retries = 0;
      return response.data;
    } catch (err: any) {
      if (
        err.response?.status === 401 &&
        this.retries < NaoConnector.MAX_RETRIES
      ) {
        this.retries++;
        await this.login();
        return this.request(method, url, data, config);
      }

      console.error(`${method.toUpperCase()} ${url} failed:`, err.message);
      return null;
    }
  }

  public async get<T>(route: string, params?: any): Promise<T | null> {
    return this.request("get", route, null, { params });
  }

  public async post<T>(
    route: string,
    body: any,
    params?: any
  ): Promise<T | null> {
    return this.request("post", route, body, { params });
  }

  public async patch<T>(
    route: string,
    body: any,
    params?: any
  ): Promise<T | null> {
    return this.request("patch", route, body, { params });
  }

  public async delete<T>(route: string, params?: any): Promise<T | null> {
    return this.request("delete", route, null, { params });
  }
}
