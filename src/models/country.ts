import { InferType, object, string } from "yup";

const countrySchema = object({
  id: string().required(),
  name: string().required(),
  code: string().required(),
});

export type Country = InferType<typeof countrySchema>;
export default countrySchema;
