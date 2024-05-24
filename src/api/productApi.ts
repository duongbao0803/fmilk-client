import axiosClient from "@/config/axiosClient";
import { ProductInfo } from "@/interfaces/interface";

const getAllProduct = (page: number) => {
  return axiosClient.get(`/v1/product`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getDetailProduct = (productId: string) => {
  return axiosClient.get(`/v1/product/${productId}`);
};

// const addUser = (formValues: AddNewUserProps) => {
//   return axiosClient.post("/v1/auth/register", formValues);
// };

// const editStatusUser = (userId: string, status: boolean) => {
//   return axiosClient.patch(`/v1/user/status/${userId}`, { status });
// };

const editProductInfo = (productId: string, formValues: ProductInfo) => {
  return axiosClient.put(`/v1/product/${productId}`, formValues);
};

const removeProduct = (productId: string) => {
  return axiosClient.delete(`/v1/product/${productId}`);
};

export { getAllProduct, getDetailProduct, removeProduct, editProductInfo };
