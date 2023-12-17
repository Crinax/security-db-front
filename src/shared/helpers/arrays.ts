export const wrapArray = <T>(value: T) => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}
