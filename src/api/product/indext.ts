import instance from "src/api/axios";
import { EndPoint } from "src/const/endpoint";
import { HTTP_METHOD } from "src/const/http-method";

export const getProducts = async (vendor?: string) => {
  return await instance({
    url: `${EndPoint.VENDOR_PRODUCTS}/${vendor}`,
    method: HTTP_METHOD.GET,
  });
};
