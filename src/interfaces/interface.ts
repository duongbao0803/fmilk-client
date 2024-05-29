import { Dayjs } from "dayjs";

export interface UserInfo {
  username?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  dob?: string | number | Date | Dayjs | null | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  _id?: string | undefined;
}

export interface ProductInfo {
  name?: string;
  image?: string;
  description?: string;
  quantity?: number;
  typeOfProduct?: string;
  price?: number;
  rating?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  infoUser: object;
  fetchUserInfo: () => void;
}

export interface ScrollToTopProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  children?: MenuItem[];
}

export interface ForgotPasswordProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SigninValues {
  username: string;
  password: string;
}

export interface SignupValues {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface ErrorProps {
  text: string;
  href: string;
}

export interface SignupProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface responseTokenProps {
  accessToken: string;
}

export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

export interface AddModalProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
  userInfo?: UserInfo;
}

export interface AddNewUserProps {
  username: string;
  password: string;
  address: string;
  email: string;
  role: string;
  phone: string;
  name: string;
}

export interface PostInfo {
  title?: string;
  description?: string;
  image?: string;
}
