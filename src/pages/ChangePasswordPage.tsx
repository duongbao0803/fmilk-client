import { ChangePasswordView } from "@/sections/change-password/view";
import React from "react";
import { Helmet } from "react-helmet";

const ChangePasswordPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Change password </title>
      </Helmet>
      <ChangePasswordView />
    </>
  );
};

export default ChangePasswordPage;
