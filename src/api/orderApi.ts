import axiosClient from "@/config/axiosClient";

const createOrder = (formValues) => {
  return axiosClient.post("/v1/order/create", formValues);
};

export { createOrder };
