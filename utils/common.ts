export const mapBackendValidationErrors = (
  errors: Record<string, Array<string>>
): Record<string, string> => {
  const mappedErrors = {} as Record<string, string>;
  for (const [key, value] of Object.entries(errors))
    mappedErrors[key] = value[0];
  return mappedErrors;
};
