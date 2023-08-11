import { InferType, object, string } from "yup";

const sessionSchema = object({
  profileId: string().required(),
  userId: string().required(),
  mlmId: string().required(),
  names: string().required(),
  lastNames: string().required(),
  fullName: string().required(),
  shortName: string().required(),
  username: string().required(),
  email: string().required(),
  phone: string().required(),
});

export type Session = InferType<typeof sessionSchema>;
export default sessionSchema;
