import { OrderedView } from "@/sections/ordered-list/view";
import React from "react";
import { Helmet } from "react-helmet";

const OrderedPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Ordered </title>
      </Helmet>
      <OrderedView />
    </>
  );
};

export default OrderedPage;
