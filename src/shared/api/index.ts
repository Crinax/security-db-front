import axios, { type AxiosInstance } from "axios";
import { AuthModule } from "@api/auth";

export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });
    this.auth = new AuthModule(this.api);
  }

  private api: AxiosInstance;
  private auth: AuthModule;

  authModule() {
    return this.auth;
  }
}

export const api = new Api();
