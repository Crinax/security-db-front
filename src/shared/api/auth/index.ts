import type { AxiosInstance } from "axios";
import type { AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";
import { ApiError } from "../errors";
import { transformAndValidate } from "class-transformer-validator";
import { AuthDtoValidator } from "./validators";

export const auth = async (
  instance: AxiosInstance,
  props: AuthorizationProps
) => {
  const validation = await transformAndValidate(AuthDtoValidator, props)
    .catch(data => new ApiError('Данные введены некорректно!'));


  if (validation instanceof ApiError) {
    return validation
  }

  const response = await instance.post<AuthResult>('/auth', props)
    .then((resp) => resp.data)
    .catch(ApiError.from);

  return response;
}

export const registration = async (
  instance: AxiosInstance,
  props: RegistrationProps
) => {
  const response = await instance.post('/auth/register', props)

  return response.data;
}
