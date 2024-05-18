import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Error, Loading, ScrollToTop } from "@/components";
import { Role } from "@/enums/enum";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import useAuth from "@/hooks/useAuth";
import Form from "@/sections/contact/Form";
import CustomerList from "@/sections/customer/CustomerList";
import AuthenPage from "@/pages/AuthenPage";
import StaffList from "@/sections/user/StaffList";
import LandingPage from "@/pages/LandingPage";
import { UserInfo } from "@/interfaces/interface";
import ErrorUser from "@/components/ErrorUser";

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Form />} />;
      <Route path="*" element={<ErrorUser />} />;
    </Routes>
  );
};

const Router: React.FC = () => {
  const { infoUser, isAuthenticated } = useAuth();
  const { role } = infoUser as UserInfo;
  useAnimation();

  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/authen",
      element: isAuthenticated ? <Navigate to="/" /> : <AuthenPage />,
    },
    {
      element:
        role === Role.ADMIN || role === Role.STAFF ? (
          <DashboardLayout>
            <ScrollToTop>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ScrollToTop>
          </DashboardLayout>
        ) : (
          <UserRoute />
        ),
      children: [
        {
          element: <ChartPage />,
          path: "/chart",
        },
        {
          element: <AdminPage />,
          path: "/admin",
        },
        {
          element: <CustomerList />,
          path: "/customer",
        },
        {
          element: <StaffList />,
          path: "/staff",
        },
        { element: <Error text="Back to home" href="/chart" />, path: "*" },
      ],
    },
    {
      element: <ErrorUser />,
      path: "*",
    },
  ]);

  return routes;
};

export default Router;
