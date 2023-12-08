export interface RegistrationProps {
  email: string;
  username: string;
  password: string;
  first_name: string;
  second_name: string;
  patronymic?: string;
  birth_date: string;
}

export interface AuthorizationProps {
  email_or_username: string;
  password: string;
}

export interface AuthResult {
  access_token: string;
  expires: number;
}
