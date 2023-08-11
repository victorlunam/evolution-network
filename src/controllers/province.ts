import fetcher from "@utils/fetcher";
import {
  Province,
  provinceSchema,
  ApiResponse,
  apiResponseSchema,
} from "@models/index";
import { array } from "yup";

const search = async (
  departmentId: string,
): Promise<ApiResponse<Province[]>> => {
  const res = await fetcher.get("api/province", {
    params: { departmentId },
  });

  return apiResponseSchema(array(provinceSchema).required()).validate(res);
};

const searchOne = async (
  provinceId: string,
): Promise<ApiResponse<Province>> => {
  const res = await fetcher.get(`api/province/${provinceId}`);

  return apiResponseSchema(provinceSchema.required()).validate(res);
};

const create = async (
  department: Partial<Province>,
): Promise<ApiResponse<Province>> => {
  const res = await fetcher.post("api/province", { data: department });

  return apiResponseSchema(provinceSchema.required()).validate(res);
};

const remove = (provinceId: string): Promise<ApiResponse<void>> => {
  return fetcher.delete(`api/province/${provinceId}`);
};

export default {
  search,
  searchOne,
  create,
  remove,
};
