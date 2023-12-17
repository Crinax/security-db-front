import { Transform, type TransformOptions } from 'class-transformer';
import { type ValidationOptions, ValidateIf } from 'class-validator';

export function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}

export function ParseAsDateWithoutTimezone(transformOptions?: TransformOptions) {
  return Transform(({ value }) => {
    const stringDate = value.endsWith('Z') ? value : `${value}Z`;

    return new Date(stringDate);
  }, transformOptions);
}
