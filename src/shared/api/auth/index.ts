import type { AxiosInstance } from "axios";
import type { AuthError, AuthResult, AuthorizationProps, RegistrationProps } from "@api/auth/types";

export const auth = async (
  instance: AxiosInstance,
  props: AuthorizationProps
) => {
  const response = await instance.post<AuthResult>('/auth', props)
    .then((resp) => resp.data)
    .catch<AuthError>((err) => err.response?.data);

  return response;
}

export const registration = async (
  instance: AxiosInstance,
  props: RegistrationProps
) => {
  const response = await instance.post('/auth/register', props)

  return response.data;
}
