import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Error, Loading, ScrollToTop } from "@/components";
import { Role } from "@/enums/enum";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import useAuth from "@/hooks/useAuth";
import Form from "@/sections/contact/Form";
import AuthenPage from "@/pages/AuthenPage";
import LandingPage from "@/pages/LandingPage";
import { UserInfo } from "@/interfaces/interface";

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const UserManagementPage = lazy(
  () => import("@/pages/UserManagementPage"),
);
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Form />} />;
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
      element: isAuthenticated ? (
        isAuthority ? (
          <DashboardLayout>
            <ScrollToTop>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ScrollToTop>
          </DashboardLayout>
        ) : (
          <UserRoute />
        )
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          element: <UserManagementPage />,
          path: "/user",
        },
        {
          element: <AdminPage />,
          path: "/admin",
        },
        {
          element: <ChartPage />,
          path: "/chart",
        },
      ],
    },
    {
      element: <Error />,
      path: "*",
    },
  ]);

  return routes;
};

export default Router;
