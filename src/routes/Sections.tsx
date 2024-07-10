import React, { Suspense, lazy, useState } from "react";
import { Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Loading, ScrollToTop } from "@/components";
import { Role } from "@/enums/enum";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import useAuth from "@/hooks/useAuth";
import AuthenPage from "@/pages/AuthenPage";
import LandingPage from "@/pages/LandingPage";
import { UserInfo } from "@/interfaces/interface";
import CartPage from "@/sections/cart/CartPage";
import Checkout from "@/sections/cart/Checkout";
import Notification from "@/sections/notification/Notification";
import Payment from "@/sections/cart/Payment";

import PostMangementPage from "@/pages/PostMangementPage";
import ProductPublicPage from "@/pages/ProductPublicPage";

export const UserManagementPage = lazy(
  () => import("@/pages/UserManagementPage"),
);
export const ProductManagementPage = lazy(
  () => import("@/pages/ProductManagementPage"),
);
export const ChartPage = lazy(() => import("@/pages/ChartPage"));
export const PostManagementPage = lazy(
  () => import("@/pages/PostMangementPage"),
);

export const BrandManagementPage = lazy(
  () => import("@/pages/BrandManagementPage"),
);

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/contact" />
    </Routes>
  );
};

const Router: React.FC = () => {
  const infoUser = useAuth((state) => state.infoUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const { role } = infoUser as UserInfo;
  useAnimation();
  const isAuthority = role === Role.ADMIN || role === Role.STAFF;

  const [isNotificationVisible, setIsNotificationVisible] =
    useState<boolean>(false);

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
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
      path: "/product",
      element: <ProductPublicPage />,
    },
    {
      path: "/notification",
      element: (
        <Notification
          visible={isNotificationVisible}
          onClose={closeNotification}
        />
      ),
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
          path: "/manageProduct",
        },
        {
          element: <PostMangementPage />,
          path: "/post",
        },
        {
          path: "/brand",
          element: <BrandManagementPage />,
        },
        {
          element: <ChartPage />,
          path: "/chart",
        },
      ],
    },
    // {
    //   element: <Error />,
    //   path: "*",
    // },
  ]);

  return (
    <>
      {routes}
      <Notification
        visible={isNotificationVisible}
        onClose={closeNotification}
      />
    </>
  );
};

export default Router;
