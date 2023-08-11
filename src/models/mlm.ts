import { InferType, bool, date, object, string } from "yup";
import { userSchema } from ".";

const mlmSchema = object({
  id: string().required().uuid(),
  parentId: string().uuid(),
  children: userSchema.optional(),
  childrenId: string().required().uuid(),
  isVerified: bool().default(false).required(),
  depositURL: string().url(),
  createdAt: date().required(),
  updatedAt: date().required(),
});

export type MLM = InferType<typeof mlmSchema>;
export default mlmSchema;
