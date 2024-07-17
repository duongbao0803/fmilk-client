import axiosClient from "../config/axiosClient";

const getAllBrand = (page: number) => {
  return axiosClient.get(`/v1/brand`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getDetailBrand = (brandId: string) => {
  return axiosClient.put(`/v1/brand/${brandId}`);
};

const editBrand = (brandId: string, brandName: string) => {
  return axiosClient.put(`/v1/brand/${brandId}`, brandName);
};

const addBrand = (brandName: string) => {
  return axiosClient.post("/v1/brand/create", brandName);
};

const removeBrand = (brandId: string) => {
  return axiosClient.delete(`/v1/brand/${brandId}`);
};

export { getAllBrand, removeBrand, addBrand, editBrand, getDetailBrand };
