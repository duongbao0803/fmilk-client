import React from "react";
import { ProductManagementView } from "@/sections/product/view";
import { Helmet } from "react-helmet";

const ProductManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Product management </title>
      </Helmet>
      <ProductManagementView />
    </>
  );
};

export default ProductManagementPage;
