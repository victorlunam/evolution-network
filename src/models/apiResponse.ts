import { AnySchema, bool, object } from "yup";

const apiResponseSchema = <T extends AnySchema>(scheme: T) => {
  return object({
    status: bool().required(),
    value: scheme,
  });
};

export type ApiResponse<T> = {
  status: boolean;
  value: T | null;
  error?: string;
  message?: string;
};
export default apiResponseSchema;
