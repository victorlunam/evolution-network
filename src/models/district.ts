import { InferType, object, string } from "yup";

const districtSchema = object({
  id: string().required(),
  name: string().required(),
});

export type District = InferType<typeof districtSchema>;
export default districtSchema;
