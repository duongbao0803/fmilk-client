import { Loading } from "@/components";
import usePaymentResult from "@/hooks/usePaymentResult";
import { PaymentData } from "@/interfaces/interface";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentView: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({});
  const location = useLocation();
  const navigate = useNavigate();
  const setPaymentResult = usePaymentResult((state) => state.setPaymentResult);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const parsedData: Record<string, string> = {};

    queryParams.forEach((value, key) => {
      parsedData[key] = value;
    });

    if (parsedData && parsedData?.vnp_ResponseCode === "00") {
      setPaymentResult(parsedData);
      navigate("/payment/success");
      return;
    } else if (parsedData && parsedData?.vnp_ResponseCode === "24") {
      setPaymentResult(parsedData);
      navigate("/payment/failure");
    } else {
      navigate("/payment/failure");
    }

    // setPaymentData(parsedData);
  }, [location.search, navigate, setPaymentResult]);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="text-center">
          <Loading />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentView;
