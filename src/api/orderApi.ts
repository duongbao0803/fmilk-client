import axiosClient from "@/config/axiosClient";

const createOrder = (formValues) => {
  return axiosClient.post("/v1/order/create", formValues);
};

const getAllOrdered = (page: number) => {
  return axiosClient.get(`v1/order/getByUser`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

export { createOrder, getAllOrdered };
