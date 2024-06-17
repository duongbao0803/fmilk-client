import React, { Suspense, lazy, useState } from "react";
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
import CartPage from "@/sections/cart/CartPage";
import Checkout from "@/sections/cart/Checkout";
import Notification from "@/sections/notification/Notification";
import Payment from "@/sections/cart/Payment";
import AdminAccountPage from "@/sections/admin/AdminAccount";
import AdminDashboardPage from "@/sections/admin/DashBoard";
import AdminOrdersPage from "@/sections/admin/OrderManagement";
import AdminProductManagementPage from "@/sections/admin/ProductManagement";
import AdminStaffManagementPage from "@/sections/admin/StaffManagement";


export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const UserManagementPage = lazy(() => import("@/pages/UserManagementPage"));
export const ProductManagementPage = lazy(() => import("@/pages/ProductManagementPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Form />} />
    </Routes>
  );
};

const Router: React.FC = () => {
  const infoUser = useAuth((state) => state.infoUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const { role } = infoUser as UserInfo;
  useAnimation(); // Apply animations
  const isAuthority = role === Role.ADMIN || role === Role.STAFF;

  const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);


  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/adminaccount",
      element: <AdminAccountPage />,
    },
    {
      path: "/admindashboard",
      element: <AdminDashboardPage />,
    },
    {
      path: "/adminorder",
      element: <AdminOrdersPage />,
    },
    {
      path: "/adminproduct",
      element: <AdminProductManagementPage />,
    },
    {
      path: "/adminstaff",
      element: <AdminStaffManagementPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/notification",
      element: <Notification visible={isNotificationVisible} onClose={closeNotification} />,
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
        <Navigate to="/authen" />
      ),
      children: [
        {
          element: <UserManagementPage />,
          path: "/user",
        },
        {
          element: <ProductManagementPage />,
          path: "/product",
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

  return (
    <>
      {routes}
      <Notification visible={isNotificationVisible} onClose={closeNotification} />
    </>
  );
};

export default Router;
