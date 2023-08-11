import { InferType, date, object, string } from "yup";

const profileSchema = object({
  id: string().required().uuid(),
  dni: string().required().length(8),
  names: string().required(),
  lastNames: string().required(),
  fullName: string().required(),
  shortName: string().required(),
  dateOfBirth: date().required(),
  departmentId: string().required().uuid(),
  provinceId: string().required().uuid(),
  districtId: string().required().uuid(),
  address: string().required(),
  createdAt: date().required(),
  updatedAt: date().required(),
});

export type Profile = InferType<typeof profileSchema>;
export default profileSchema;
