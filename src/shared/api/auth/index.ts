import type { AxiosInstance } from "axios";
import type { AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";
import { ApiError } from "@api/errors";
import { transformAndValidate } from "class-transformer-validator";
import { AuthDtoValidator, RegDtoValidator } from "@api/auth/validators";

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
    return this.expiration > Date.now() + 280000;
  }

  isLogged() {
    return !!this.access_token.length && !this.isExpired();
  }

  private updateTokens(access_token: string, expires: number) {
    this.access_token = access_token;
    this.expiration = expires;
    this.api.defaults.headers.Authorization = `Bearer ${access_token}`;
  }

  private removeTokens() {
    this.access_token = '';
    this.expiration = 0;
  }

  async refresh() {
    const response = await this.api.post<AuthResult>('/auth/refresh-tokens')
      .then((resp) => resp.data)
      .catch(ApiError.from);


    if (response instanceof ApiError) {
      return response;
    }

    const { access_token, expires } = response;
    this.updateTokens(access_token, expires);
  }

  async logout() {
    await this.api.post('/auth/logout');
    this.removeTokens();
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
    this.updateTokens(access_token, expires);
  }

  async registration(props: RegistrationProps) {
    const validation = await transformAndValidate(RegDtoValidator, props)
      .catch((err) => new ApiError('Данные введены некорректно'));

    if (validation instanceof ApiError) {
      return validation;
    }

    const response = await this.api.post<AuthResult>('/auth/register', validation)
      .then((resp) => resp.data)
      .catch(ApiError.from);

    if (response instanceof ApiError) {
      return response;
    }

    const { access_token, expires } = response;
    this.updateTokens(access_token, expires);
  }
}
