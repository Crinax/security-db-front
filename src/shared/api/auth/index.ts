import type { AxiosInstance } from "axios";
import type { AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";
import { ApiError } from "../errors";
import { transformAndValidate } from "class-transformer-validator";
import { AuthDtoValidator } from "./validators";

export class AuthModule {
  constructor(axios: AxiosInstance) {
    this.api = axios;
    this.access_token = '';
    this.expiration = 0;
  }

  private api: AxiosInstance;
  private access_token: string;
  private expiration: number;

  isExpired() {
    return this.expiration > Date.now() + 240000;
  }

  isLogged() {
    this.access_token.length && !this.isExpired();
  }

  async auth(props: AuthorizationProps) {
    const validation = await transformAndValidate(AuthDtoValidator, props)
      .catch(() => new ApiError('Данные введены некорректно!'));

    if (validation instanceof ApiError) {
      return validation;
    }

    const response = await this.api.post<AuthResult>('/auth', props)
      .then((resp) => resp.data)
      .catch(ApiError.from);

    if (response instanceof ApiError) {
      return response;
    }

    const { access_token, expires } = response;

    this.access_token = access_token;
    this.expiration = expires;
    this.api.defaults.headers.Authorization = `Bearer ${access_token}`;
  }

  async registration(props: RegistrationProps) {
    const response = await this.api.post('/auth/register', props);

    return response.data;
  }
}
