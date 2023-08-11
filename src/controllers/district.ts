import fetcher from "@utils/fetcher";
import {
  District,
  districtSchema,
  ApiResponse,
  apiResponseSchema,
} from "@models/index";
import { array } from "yup";

const search = async (provinceId: string): Promise<ApiResponse<District[]>> => {
  const res = await fetcher.get("api/district",{
    params: { provinceId },
  });

  return apiResponseSchema(array(districtSchema).required()).validate(res);
};

const searchOne = async (
  districtId: string,
): Promise<ApiResponse<District>> => {
  const res = await fetcher.get(`api/district/${districtId}`);

  return apiResponseSchema(districtSchema.required()).validate(res);
};

const create = async (
  department: Partial<District>,
): Promise<ApiResponse<District>> => {
  const res = await fetcher.post("api/district", { data: department });

  return apiResponseSchema(districtSchema.required()).validate(res);
};

const remove = (districtId: string): Promise<ApiResponse<void>> => {
  return fetcher.delete(`api/district/${districtId}`);
};

export default {
  search,
  searchOne,
  create,
  remove,
};
