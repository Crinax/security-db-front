export interface ErrorMessage {
  message: string;
}

export class ApiError {
  constructor(message: string) {
    this.message = message;
  }

  message: string;

  static from(err: any): ApiError {
    if (err?.response?.data) {
      switch (err.response.data.message) {
        case 'internal_error':
          return new ApiError('Внутренняя ошибка сервера...');
        case 'invalid_data':
          return new ApiError('Данные введены некорректно!');
        case 'no_rights':
          return new ApiError('Ошибка! У вас недостаточно прав');

        default:
          return new ApiError('Произошла непредвиденная ошибка...');
      }
    }

    console.log(err);
    return new ApiError('Произошла непредвиденная ошибка...');
  }

  toString() {
    return this.message;
  }
}
