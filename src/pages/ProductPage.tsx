import ProductDetailsPage from "@/sections/product/view/ProductDetails";
import React from "react";
import { Helmet } from "react-helmet";

const ProductDetails: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | User management </title>
      </Helmet>
      <ProductDetailsPage />
    </>
  );
};

export default ProductDetails;
