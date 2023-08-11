import fetcher from "@utils/fetcher";
import {
  Department,
  departmentSchema,
  ApiResponse,
  apiResponseSchema,
} from "@models/index";
import { array } from "yup";

const search = async (
  countryId: string,
): Promise<ApiResponse<Department[]>> => {
  const res = await fetcher.get("api/department", {
    params: { countryId },
  });

  return apiResponseSchema(array(departmentSchema).required()).validate(res);
};

const searchOne = async (
  departmentId: string,
): Promise<ApiResponse<Department>> => {
  const res = await fetcher.get(`api/department/${departmentId}`);

  return apiResponseSchema(departmentSchema.required()).validate(res);
};

const create = async (
  department: Partial<Department>,
): Promise<ApiResponse<Department>> => {
  const res = await fetcher.post("api/department", { data: department });

  return apiResponseSchema(departmentSchema.required()).validate(res);
};

const remove = (departmentId: string): Promise<ApiResponse<void>> => {
  return fetcher.delete(`api/department/${departmentId}`);
};

export default {
  search,
  searchOne,
  create,
  remove,
};
