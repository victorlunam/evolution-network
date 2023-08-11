import {
  ApiResponse,
  SignInRequest,
  SignUpRequest,
  apiResponseSchema,
  sessionSchema,
  Session,
} from "@models/index";
import fetcher from "@utils/fetcher";
import { bool } from "yup";

const usernameAvailable = async (
  username: string,
): Promise<ApiResponse<boolean>> => {
  const res = await fetcher.get(`api/auth/usernameAvailable/${username}`);

  return apiResponseSchema(bool().required().nullable()).validate(res);
};

const signUp = async (
  data: SignUpRequest & {
    registerBy?: string;
    fullName: string;
    shortName: string;
  },
): Promise<ApiResponse<Session>> => {
  const res = await fetcher.post("api/auth/signup", {
    data,
  });

  return apiResponseSchema(sessionSchema.nullable()).validate(res);
};

const signIn = async (data: SignInRequest): Promise<ApiResponse<Session>> => {
  const res = await fetcher.post("api/auth/signIn", {
    data,
  });

  return apiResponseSchema(sessionSchema.nullable()).validate(res);
};

export default {
  usernameAvailable,
  signUp,
  signIn,
};
