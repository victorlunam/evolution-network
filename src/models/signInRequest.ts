import { userRequiredField } from "@utils/index";
import { InferType, object, string } from "yup";

const signInRequestSchema = object({
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

export type SignInRequest = InferType<typeof signInRequestSchema>;
export default signInRequestSchema;
