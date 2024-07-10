import React, { useEffect } from "react";
import Router from "./routes/Sections";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { ScrollToTop } from "./components";

const queryClient = new QueryClient();
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const App: React.FC = () => {
  const fetchUserInfo = useAuth((state) => state.fetchUserInfo);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </QueryClientProvider>
    </>
  );
};

export default App;
