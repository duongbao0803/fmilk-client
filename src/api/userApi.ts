import axiosClient from "@/config/axiosClient";
import { AddNewUserProps, UserInfo } from "@/interfaces/interface";

const getAllUser = (page: number) => {
  return axiosClient.get(`/v1/user`, {
    params: {
      page: page,
      pageSize: 20,
    },
  });
};

const getDetailUser = (userId: string) => {
  return axiosClient.get(`/v1/user/${userId}`);
};

const addUser = (formValues: AddNewUserProps) => {
  return axiosClient.post("/v1/auth/register", formValues);
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

export {
  getAllUser,
  removeUser,
  editStatusUser,
  editUserInfo,
  getDetailUser,
  addUser,
};
