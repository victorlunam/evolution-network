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
  // const res = await fetcher.post("api/auth/signIn", {
  //   data,
  // });
  
  const res = {
    status: true,
    value: {
      profileId: 'c3591c82-020c-48cc-8ddf-23adce6625b7',
      userId: '7c89ce95-0392-4550-909b-5d293beea6c1',
      mlmId: 'd903106e-946b-4988-8cc8-212cfa99b93b',
      names: 'Cesar',
      lastNames: 'Perez Fernandez',
      fullName: 'Cesar Perez Fernandez',
      shortName: 'Cesar Perez',
      username: 'cperez',
      email: 'cesar@test.com',
      phone: '+51999000999',
    }
  }

  return apiResponseSchema(sessionSchema.nullable()).validate(res);
};

export default {
  usernameAvailable,
  signUp,
  signIn,
};
