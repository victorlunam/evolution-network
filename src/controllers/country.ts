import fetcher from "@utils/fetcher";
import {
  Country,
  countrySchema,
  ApiResponse,
  apiResponseSchema,
} from "@models/index";
import { array } from "yup";

const search = async (): Promise<ApiResponse<Country[]>> => {
  const res = await fetcher.get("api/country");

  return apiResponseSchema(array(countrySchema).required()).validate(res);
};

const searchOne = async (countryId: number): Promise<ApiResponse<Country>> => {
  const res = await fetcher.get(`api/country/${countryId}`);

  return apiResponseSchema(countrySchema.required()).validate(res);
};

const create = async (
  country: Partial<Country>,
): Promise<ApiResponse<Country>> => {
  const res = await fetcher.post("api/country", { data: country });

  return apiResponseSchema(countrySchema.required()).validate(res);
};

const remove = (countryId: number): Promise<ApiResponse<void>> => {
  return fetcher.delete(`api/country/${countryId}`);
};

export default {
  search,
  searchOne,
  create,
  remove,
};
