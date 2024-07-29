import React from "react";
import failureIcon from "@/assets/images/failure-icon.png";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import usePaymentResult from "@/hooks/usePaymentResult";
import { formatDateFromString, PriceFormat } from "@/util/validate";
import useAuthService from "@/services/authService";

const PaymentFailure: React.FC = () => {
  const paymentResult = usePaymentResult((state) => state.paymentResult);
  const { infoUser } = useAuthService();

  const formattedCurrency = PriceFormat.format(paymentResult?.vnp_Amount);

  return (
    <>
      <Header />
      <div className="bg-[#f5f5f5] pt-[70px]">
        <div className="mx-auto my-0 min-h-[100px] w-[573px] px-0 py-[50px]  ">
          <div className="relative border-2 border-[#df381b] bg-[#fff]">
            <div className="bg-[#df381b] p-[10px] text-center text-[#fff]">
              <h6 className="text-center font-bold">THÔNG TIN THANH TOÁN</h6>
            </div>
            <div className="mt-[10px] flex flex-col items-center justify-center">
              <img
                src={failureIcon}
                alt="Lỗi"
                width="90px"
                className="text-center"
              />
              <h5 className="my-[20px] text-xl font-bold">
                Thanh toán thất bại
              </h5>
            </div>
            <div className="px-[30px] py-0 leading-8">
              <table>
                <tbody>
                  <tr>
                    <th className="text-left">Khách hàng:</th>
                    <td className="absolute right-[30px]">{infoUser?.name}</td>
                  </tr>
                  <tr>
                    <th className="text-left">Email:</th>
                    <td className="absolute right-[30px]">{infoUser?.email}</td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã đơn hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_TxnRef"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Số tiền:</th>
                    <td className="absolute right-[30px]">
                      {formattedCurrency}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã giao dịch:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_TransactionNo"]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mx-auto my-[10px] flex items-center px-[30px] py-0">
              <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
              <span className="px-2">Chi tiết</span>
              <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
            </div>
            <div className="px-[30px] py-0 leading-8">
              <table>
                <tbody>
                  <tr>
                    <th className="text-left">Nội dung:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_OrderInfo"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã ngân hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_BankCode"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Loại thanh toán:</th>
                    <td className="absolute right-[30px]">VNPAY</td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã giao dịch ngân hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_BankTranNo"] || 0}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Ngày thanh toán:</th>
                    <td className="absolute right-[30px]">
                      {formatDateFromString(paymentResult?.["vnp_PayDate"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Trạng thái:</th>
                    <td className="absolute right-[30px]">Hủy thanh toán</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-[50px] text-center font-bold">
                <p className="mb-0">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
                </p>
                <p className="mb-0">Hẹn gặp lại!</p>
              </div>
              <div className="mt-[20px] flex justify-between pb-[10px]">
                <p>
                  <a href="/" className="text-[#57adfd] hover:underline">
                    Trang chủ
                  </a>
                </p>
                <p>
                  Cung cấp bởi{" "}
                  <a
                    href="https://vnpay.vn/"
                    target="_blank"
                    className="text-[#57adfd] hover:underline"
                  >
                    VNPAY
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailure;
