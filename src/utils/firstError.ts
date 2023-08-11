import { SignUpRequest } from "@models/signUpRequest";
import { FieldErrors } from "react-hook-form";

const firstError = (errors: FieldErrors<SignUpRequest> = {}) => {
  const values = Object.values(errors);

  if (values.length === 0) return null;

  return values[0].message;
};

export default firstError;
