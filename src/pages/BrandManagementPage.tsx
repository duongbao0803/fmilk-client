import React from "react";
import { Helmet } from "react-helmet";
import { BrandManagementView } from "../sections/brand/view";

const BrandManagementPage = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Brand management </title>
      </Helmet>
      <BrandManagementView />
    </>
  );
};

export default BrandManagementPage;
