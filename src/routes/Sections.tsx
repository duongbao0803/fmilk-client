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

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Form />} />;
      <Route path="*" element={<Error />} />;
    </Routes>
  );
};

const Router: React.FC = () => {
  const { infoUser, isAuthenticated } = useAuth();
  const { role } = infoUser as UserInfo;
  useAnimation();
  const isAuthority = role === Role.ADMIN || role === Role.STAFF;

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
      element: <Error />,
      path: "*",
    },
    {
      element: isAuthority ? (
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
      ],
    },
  ]);

  return routes;
};

export default Router;
