export interface UserInfo {
  username: string;
  email: string;
  name: string;
  role: string;
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

export interface ErrorProps {
  text: string;
  href: string;
}

export interface SignupProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
