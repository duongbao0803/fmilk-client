import React, { Suspense, lazy, useState } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Error, ForBidden, Loading, ScrollToTop } from "@/components";
import { Role } from "@/enums/enum";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import useAuth from "@/hooks/useAuth";
import AuthenPage from "@/pages/AuthenPage";
import LandingPage from "@/pages/LandingPage";
import CartPage from "@/sections/cart/CartPage";
// import Checkout from "@/sections/cart/Checkoutt";
import Notification from "@/sections/notification/Notification";
import Checkout from "@/sections/cart/Checkout";
import PostMangementPage from "@/pages/PostMangementPage";
import ProductPublicPage from "@/pages/ProductPublicPage";
import ProductDetail from "@/sections/product-public/ProductDetail";
import PaymentSuccess from "@/sections/payment/PaymentSuccess";
import PaymentPage from "@/pages/PaymentPage";
import PaymentFailure from "@/sections/payment/PaymentFailure";
import PostPublicPage from "@/pages/PostPublicPage";
import PersonalPage from "@/pages/PersonalPage";
import UserLayout from "@/layout/UserLayout";
import useAuthService from "@/services/authService";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import PostDetail from "@/sections/post-public/PostDetail";

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

const Router: React.FC = () => {
  const { infoUser } = useAuthService();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  useAnimation();
  const isAuthority =
    infoUser?.role === Role.ADMIN || infoUser?.role === Role.STAFF;
  const isAdmin = infoUser?.role === Role.ADMIN;

  console.log("check isAuthority", isAuthority);

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
      element: !isAuthority ? <CartPage /> : <Navigate to="/" replace />,
    },
    {
      path: "/checkout",
      element: !isAuthority ? <Checkout /> : <Navigate to="/" replace />,
    },
    {
      path: "/payment",
      element: !isAuthority ? <PaymentPage /> : <Navigate to="/" replace />,
    },
    {
      path: "/product",
      element: <ProductPublicPage />,
    },
    {
      path: "/post",
      element: <PostPublicPage />,
    },
    {
      path: "/post/:postId",
      element: <PostDetail />,
    },
    {
      path: "/product/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/failure",
      element: <PaymentFailure />,
    },
    {
      path: "/authen",
      element: isAuthenticated ? <Navigate to="/" /> : <AuthenPage />,
    },
    {
      path: "/",
      element: (
        <UserLayout>
          <Outlet />
        </UserLayout>
      ),
      children: [
        {
          path: "personal",
          element:
            isAuthenticated && !isAuthority ? (
              <PersonalPage />
            ) : (
              <Navigate to="/" replace />
            ),
        },
        {
          path: "password",
          element:
            isAuthenticated && !isAuthority ? (
              <ChangePasswordPage />
            ) : (
              <Navigate to="/" replace />
            ),
        },
      ],
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
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/authen" />
      ),
      children: [
        {
          element: isAdmin ? <UserManagementPage /> : <ForBidden />,
          path: "/user",
        },
        {
          element: isAuthority ? (
            <ProductManagementPage />
          ) : (
            <Navigate to="/" replace />
          ),

          path: "/manageProduct",
        },
        {
          element: isAuthority ? (
            <PostMangementPage />
          ) : (
            <Navigate to="/" replace />
          ),

          path: "/managePost",
        },
        {
          path: "/brand",
          element: isAuthority ? (
            <BrandManagementPage />
          ) : (
            <Navigate to="/" replace />
          ),
        },
        {
          element: isAdmin ? <ChartPage /> : <ForBidden />,
          path: "/chart",
        },
      ],
    },
    {
      element: <Error />,
      path: "/error",
    },
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
