import React, { Suspense, lazy } from "react";
import { Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Error, Loading, ScrollToTop } from "@/components";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import CustomerList from "@/sections/customer/CustomerList";
import AuthenPage from "@/pages/AuthenPage";
import StaffList from "@/sections/user/StaffList";
import LandingPage from "@/pages/LandingPage";
import Form from "@/sections/contact/Form";

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Form />} />;
      <Route path="*" element={<Error text="Back to home" href="/" />} />;
    </Routes>
  );
};

const Router: React.FC = () => {
  const role = "user";
  useAnimation();

  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/authen",
      element: <AuthenPage />,
    },
    {
      element:
        role !== "user" ? (
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
  ]);

  return routes;
};

export default Router;
