import axios, { type AxiosInstance } from "axios";
import { AuthModule } from "@api/auth";
import { LawsModule } from "./laws";

export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });
    this.auth = new AuthModule(this.api, ['/auth', '/auth/refresh-tokens', '/auth/register']);
    this.laws = new LawsModule(this.api);
  }

  private api: AxiosInstance;
  private auth: AuthModule;
  private laws: LawsModule;

  authModule() {
    return this.auth;
  }

  lawsModule() {
    return this.laws;
  }
}

export const api = new Api();
