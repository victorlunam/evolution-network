import fetcher from "@utils/fetcher";
import {
  ApiResponse,
  apiResponseSchema,
  Profile,
  profileSchema,
} from "@models/index";
import { array } from "yup";

const search = async (): Promise<ApiResponse<Profile[]>> => {
  const res = await fetcher.get("api/profile");

  return apiResponseSchema(array(profileSchema).required()).validate(res);
};

const searchOne = async (profileId: string): Promise<ApiResponse<Profile>> => {
  const res = await fetcher.get(`api/profile/${profileId}`);

  return apiResponseSchema(profileSchema.required()).validate(res);
};

const create = async (
  profile: Partial<Profile>,
): Promise<ApiResponse<Profile>> => {
  const res = await fetcher.post("api/profile", { data: profile });

  return apiResponseSchema(profileSchema.required()).validate(res);
};

const remove = (countryId: string): Promise<ApiResponse<void>> => {
  return fetcher.delete(`api/profile/${countryId}`);
};

export default {
  search,
  searchOne,
  create,
  remove,
};
