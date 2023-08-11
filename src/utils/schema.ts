export const USER_LENGTH_DNI = "El DNI debe tener 8 dígitos.";
export const USER_VALID_EMAIL = "Ingrese un email valido.";
export const USER_VALID_UUID = "Seleccione un UUID valido";

export const userRequiredField = (field: string) =>
  `El campo "${field}" es requerido.`;

export const userValidUUID = (field: string) =>
  `${USER_VALID_UUID} para el campo "${field}"`;

export const parseDateString = (_: unknown, originalValue: string | Date) => {
  if (!originalValue) return null;

  return originalValue instanceof Date
    ? originalValue
    : new Date(originalValue);
};
