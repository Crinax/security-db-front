import axios, { type AxiosInstance } from "axios";
import { AuthModule } from "@api/auth";

export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    })
  }

  private api: AxiosInstance;

  authModule() {
    return new AuthModule(this.api);
  }
}

export const api = new Api();
