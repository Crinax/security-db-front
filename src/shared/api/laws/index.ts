import type { AxiosInstance } from "axios";
import type { DeleteLawsResponse, LawsResponse } from "./types";
import { transformAndValidate } from "class-transformer-validator";
import { DeleteManyLawsResponseValidator, LawsResponseValidator } from "./validators";
import { ApiError } from "../errors";

export class LawsModule {
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  private api: AxiosInstance;

  validateLaws(response: LawsResponse | LawsResponse[]) {
    return transformAndValidate(LawsResponseValidator, response);
  }

  validateLawsDeletion(response: DeleteLawsResponse[]) {
    return transformAndValidate(DeleteManyLawsResponseValidator, response);
  }

  async getLaws() {
    return await this.api.get<LawsResponse[]>('/laws')
      .then((resp) => this.validateLaws(resp.data))
      .catch(ApiError.from);
  }

  async deleteMany(uids: string[]) {
    return await this.api.delete<DeleteLawsResponse[]>('/laws', {
      data: { uids }
    })
      .then((resp) => this.validateLawsDeletion(resp.data))
      .catch(ApiError.from)
  }
}
