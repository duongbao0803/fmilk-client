import React from "react";
import { Helmet } from "react-helmet";
import { AuthenView } from "@/sections/authen/view";

const AuthenPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Authen </title>
      </Helmet>
      <AuthenView />
    </>
  );
};

export default AuthenPage;
