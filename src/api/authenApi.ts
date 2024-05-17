import axiosClient from "@/config/axiosClient";
import { SigninValues } from "@/interfaces/interface";

const login = (formValues: SigninValues) => {
  return axiosClient.post("/v1/auth/login", formValues);
};

const getInfoUser = () => {
  return axiosClient.get("/v1/auth/infoUser");
};

export { login, getInfoUser };
