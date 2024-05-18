import { getInfoUser } from "@/api/authenApi";
import { AuthState } from "@/interfaces/interface";
import Cookies from "js-cookie";
import { create } from "zustand";

const useAuth = create<AuthState>((set) => ({
  infoUser: {},
  fetchUserInfo: async () => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        set({ infoUser: res?.data?.info || {} });
      }
    } catch (err) {
      console.error("Error fetching userInfo", err);
    }
  },

  isAuthenticated: !!Cookies.get("token"),
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("token");
    sessionStorage.removeItem("keys");
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
