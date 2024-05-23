import axiosClient from "@/config/axiosClient";
import { UserInfo } from "@/interfaces/interface";

const getAllUser = () => {
  return axiosClient.get("/v1/user");
};

const getDetailUser = (userId: string) => {
  return axiosClient.get(`/v1/user/${userId}`);
};

const editStatusUser = (userId: string, status: boolean) => {
  return axiosClient.patch(`/v1/user/status/${userId}`, { status });
};

const editUserInfo = (userId: string, formValues: UserInfo) => {
  return axiosClient.put(`/v1/user/${userId}`, formValues);
};

const removeUser = (userId: string) => {
  return axiosClient.delete(`/v1/user/${userId}`);
};

export { getAllUser, removeUser, editStatusUser, editUserInfo, getDetailUser };
