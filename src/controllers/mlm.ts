import apiResponseSchema, { ApiResponse } from "@models/apiResponse";
import mlmSchema, { MLM } from "@models/mlm";
import mlmOrganizationSchema, {
  MLMOrganization,
} from "@models/mlmOrganization";
import fetcher from "@utils/fetcher";
import { array } from "yup";

const search = async (params: {
  parentId: string;
}): Promise<ApiResponse<MLM[]>> => {
  const res = await fetcher.get("api/mlm", {
    params,
  });

  return apiResponseSchema(array(mlmSchema).required()).validate(res);
};

const searchOrganization = async (
  userId: string,
): Promise<ApiResponse<MLMOrganization[]>> => {
  const res = await fetcher.get(`mlm/${userId}`);

  return apiResponseSchema(array(mlmOrganizationSchema).required()).validate(
    res,
  );
};

export default {
  search,
  searchOrganization,
};
