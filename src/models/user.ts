import { InferType, bool, date, object, string } from "yup";

const userSchema = object({
  id: string().required().uuid(),
  username: string().required(),
  email: string().required().email(),
  phone: string().required(),
  emailVerify: bool().default(false).required(),
  phoneVerify: bool().default(false).required(),
  isFirstLogin: bool().default(false).required(),
  profileId: string().required().uuid(),
  createdAt: date().required(),
  updatedAt: date().required(),
});

export type User = InferType<typeof userSchema>;
export default userSchema;
