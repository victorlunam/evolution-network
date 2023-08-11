import { InferType, boolean, object, string } from "yup";

const mlmOrganizationSchema = object({
  id: string().required(),
  parentId: string().required(),
  childrenId: string().required(),
  fullName: string().required(),
  phone: string().required(),
  isVerified: boolean().required(),
  depositPhotoURL: string(),
});

export type MLMOrganization = InferType<typeof mlmOrganizationSchema>;
export default mlmOrganizationSchema;
