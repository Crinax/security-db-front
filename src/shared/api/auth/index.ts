import type { AxiosInstance } from "axios";
import type { AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";
import { ApiError } from "../errors";
import { transformAndValidate } from "class-transformer-validator";
import { AuthDtoValidator } from "./validators";

export class AuthModule {
  constructor(axios: AxiosInstance) {
    this.api = axios;
  }

  api: AxiosInstance;

  async auth(props: AuthorizationProps) {
    const validation = await transformAndValidate(AuthDtoValidator, props)
      .catch(() => new ApiError('Данные введены некорректно!'));

    if (validation instanceof ApiError) {
      return validation;
    }

    const response = await this.api.post<AuthResult>('/auth', props)
      .then((resp) => resp.data)
      .catch(ApiError.from);

    return response;
  }

  async registration(props: RegistrationProps) {
    const response = await this.api.post('/auth/register', props);

    return response.data;
  }
}
