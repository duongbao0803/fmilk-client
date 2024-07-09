import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Paymentt: React.FC = () => {
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Lấy query parameters từ URL
    const params = new URLSearchParams(location.search);
    const vnp_Amount = params.get("vnp_Amount");
    const vnp_BankCode = params.get("vnp_BankCode");
    // Lấy các thông số khác tương tự

    // Tạo một đối tượng để chứa các thông số
    const data = {
      vnp_Amount,
      vnp_BankCode,
      // Các thông số khác
    };

    // Cập nhật state với dữ liệu từ URL
    setPaymentData(data);
  }, [location.search]);

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Result</h1>
      <p>Amount: {paymentData?.vnp_Amount}</p>
      <p>Bank Code: {paymentData?.vnp_BankCode}</p>
      {/* Hiển thị các thông tin khác tương tự */}
    </div>
  );
};

export default Paymentt;
