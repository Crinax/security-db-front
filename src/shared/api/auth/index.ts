import { type AxiosInstance } from "axios";
import type { AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";
import { ApiError } from "@api/errors";
import { transformAndValidate } from "class-transformer-validator";
import { AuthDtoValidator, RegDtoValidator } from "@api/auth/validators";

export class AuthModule {
  constructor(axios: AxiosInstance, withoutAuthUrls: string[]) {
    this.api = axios;
    this.access_token = '';
    this.expiration = 0;
    this.isMiddlewareSetted = false;
    this.withoutAuthUrls = withoutAuthUrls;
  }

  private api: AxiosInstance;
  private access_token: string;
  private expiration: number;
  private isMiddlewareSetted: boolean;
  private withoutAuthUrls: string[];

  isExpired() {
    return Date.now() + 60000 > this.expiration;
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
    this.setupMiddleware();
  }

  async logout() {
    await this.api.post('/auth/logout');
    this.removeTokens();
  }

  setupMiddleware() {
    if (!this.isMiddlewareSetted) {
      this.api.interceptors.request.use(async (config) => {
        if (!config.url) {
          return config;
        }

        if (this.withoutAuthUrls.includes(config.url)) {
          return config;
        }

        if (!this.isExpired()) {
          return config;
        }

        const result = await this.refresh();
        console.log(result);

        if (result instanceof ApiError) {
          throw new ApiError('Не авторизован');
        }

        return config;
      });
    }
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
    this.setupMiddleware();
  }

  async registration(props: RegistrationProps) {
    const validation = await transformAndValidate(RegDtoValidator, props)
      .catch(() => new ApiError('Данные введены некорректно'));

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
    this.setupMiddleware();
  }
}
