import {
  USER_LENGTH_DNI,
  USER_VALID_EMAIL,
  parseDateString,
  userRequiredField,
  userValidUUID,
} from "@utils/index";
import { InferType, date, object, ref, string } from "yup";

const signUpRequestSchema = object({
  names: string().trim().required(userRequiredField("Nombres")),
  lastNames: string().trim().required(userRequiredField("Apellidos")),
  dni: string()
    .trim()
    .required(userRequiredField("DNI"))
    .length(8, USER_LENGTH_DNI),
  dateOfBirth: date()
    .transform(parseDateString)
    .required(userRequiredField("Fecha de Nacimiento")),
  departmentId: string()
    .trim()
    .required(userRequiredField("Departamento"))
    .uuid(userValidUUID("Departamento")),
  provinceId: string()
    .trim()
    .required(userRequiredField("Provincia"))
    .uuid(userValidUUID("Provincia")),
  districtId: string()
    .trim()
    .required(userRequiredField("Distrito"))
    .uuid(userValidUUID("Distrito")),
  address: string().trim().required(userRequiredField("Dirección")),
  phone: string().trim().required(userRequiredField("Celular")),
  email: string()
    .trim()
    .required(userRequiredField("Email"))
    .email(USER_VALID_EMAIL)
    .oneOf([ref("emailConfirmation"), ""], "El email no es el mismo."),
  emailConfirmation: string()
    .trim()
    .required(userRequiredField("Confirmar Email"))
    .email(USER_VALID_EMAIL)
    .oneOf([ref("email"), ""], "El email no es el mismo."),
  username: string()
    .trim()
    .required(userRequiredField("Usuario"))
    .matches(/^.{8,20}$/, "El usuario debe tener entre 8 a 20 caracteres")
    .matches(
      /^[A-Za-z0-9]+$/,
      "El usuario no puede contener caracteres especiales",
    ),
  password: string().trim().required(userRequiredField("Contraseña")),
});

export type SignUpRequest = InferType<typeof signUpRequestSchema>;
export default signUpRequestSchema;
