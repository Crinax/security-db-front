import type { AxiosInstance } from "axios";
import type { AuthorizationProps, RegistrationProps } from "@api/auth/types";

export const auth = async (
  instance: AxiosInstance,
  props: AuthorizationProps
) => {
  const response = await instance.post('/auth', props);

  return response.data;
}

export const registration = async (
  instance: AxiosInstance,
  props: RegistrationProps
) => {
  const response = await instance.post('/auth/register', props);

  return response.data;
}
