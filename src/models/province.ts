import { InferType, object, string } from "yup";

const provinceSchema = object({
  id: string().required(),
  name: string().required(),
});

export type Province = InferType<typeof provinceSchema>;
export default provinceSchema;
