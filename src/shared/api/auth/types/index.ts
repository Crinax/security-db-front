export interface RegistrationProps {
  email: string,
  username: string,
  password: string,
  first_name: string,
  second_name: string,
  patronymic?: string,
  birth_date: string,
}

export interface AuthorizationProps {
  username_or_email: string,
  password: string,
}
