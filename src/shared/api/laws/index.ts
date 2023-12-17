import type { AxiosInstance } from "axios";

export class LawsModule {
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  private api: AxiosInstance;

  getLaws() {
    return this.api.get('/laws');
  }
}
