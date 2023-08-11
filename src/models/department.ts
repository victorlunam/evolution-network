import { InferType, object, string } from "yup";

const departmentSchema = object({
  id: string().required(),
  name: string().required(),
});

export type Department = InferType<typeof departmentSchema>;
export default departmentSchema;
