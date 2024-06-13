import React from "react";
import failureIcon from "@/assets/images/failure-icon.png";

const PaymentFailure: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5]">
      <div className="mx-auto my-0 min-h-[100px] w-[573px] px-0 py-[50px]  ">
        <div className="border-1 relative border-2 border-[red] bg-[#fff]">
          <div className="bg-[red] p-[10px] text-center text-[#fff]">
            <h6 className="text-center font-bold">THÔNG TIN THANH TOÁN</h6>
          </div>

          <div className="mt-[10px] flex flex-col items-center justify-center">
            <img
              src={failureIcon}
              alt="Lỗi"
              width="90px"
              className="text-center"
            />
            <h5 className="my-[20px] text-xl font-bold">Thanh toán thất bại</h5>
          </div>
          <div className="px-[30px] py-0 leading-8">
            <table>
              <tbody>
                <tr>
                  <th className="text-left">Khách hàng:</th>
                  <td className="absolute right-[30px]">Dương Bảo</td>
                </tr>
                <tr>
                  <th className="text-left">Email:</th>
                  <td className="absolute right-[30px]">
                    duongbao2k3@gmail.com
                  </td>
                </tr>
                <tr>
                  <th className="text-left">Mã đơn hàng:</th>
                  <td className="absolute right-[30px]">12345</td>
                </tr>
                <tr>
                  <th className="text-left">Số tiền:</th>
                  <td className="absolute right-[30px]">12.345.678₫</td>
                </tr>
                <tr>
                  <th className="text-left">Mã giao dịch:</th>
                  <td className="absolute right-[30px]">123</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mx-auto my-[10px] flex items-center px-[30px] py-0">
            <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
            <span>Chi tiết</span>
            <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
          </div>
          <div className="px-[30px] py-0 leading-8">
            <table>
              <tbody>
                <tr>
                  <th className="text-left">Nội dung:</th>
                  <td className="absolute right-[30px]">Sữa cho mẹ bầu</td>
                </tr>
                <tr>
                  <th className="text-left">Mã ngân hàng:</th>
                  <td className="absolute right-[30px]">#123123</td>
                </tr>
                <tr>
                  <th className="text-left">Loại thanh toán:</th>
                  <td className="absolute right-[30px]">VNPAY</td>
                </tr>
                <tr>
                  <th className="text-left">Mã giao dịch ngân hàng:</th>
                  <td className="absolute right-[30px]">#234</td>
                </tr>
                <tr>
                  <th className="text-left">Ngày thanh toán:</th>
                  <td className="absolute right-[30px]">12/07/2024</td>
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
  );
};

export default PaymentFailure;
