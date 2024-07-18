import { PaymentView } from "@/sections/payment/view";
import React from "react";
import { Helmet } from "react-helmet";

const PaymentPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> FMilk | Payment </title>
      </Helmet>
      <PaymentView />
    </>
  );
};

export default PaymentPage;
