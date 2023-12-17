import type { AxiosInstance } from "axios";
import type { LawsResponse } from "./types";
import { transformAndValidate } from "class-transformer-validator";
import { LawsResponseValidator } from "./validators";
import { ApiError } from "../errors";

export class LawsModule {
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  private api: AxiosInstance;

  validateLaws(response: LawsResponse) {
    return transformAndValidate(LawsResponseValidator, response);
  }

  async getLaws() {
    return await this.api.get<LawsResponse>('/laws')
      .then((resp) => this.validateLaws(resp.data))
      .catch(ApiError.from);
  }
}
