import React from "react";
import { MailOutlined } from "@ant-design/icons";

const Footer: React.FC = React.memo(() => {
  return (
    <>
      <div className="max-h-[400px]">
        <div className="background4 relative">
          <div className="absolute top-[100px]">
            <div className="grid grid-cols-3 justify-center px-48 text-white">
              <div>
                <p className="mb-4 text-xl font-bold">
                  Trường Đại học FPT Thành Phố Hồ Chí Minh
                </p>
                <p className="mb-4 text-lg">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
                <p className="mb-4 text-lg">
                  <MailOutlined /> {""} tonbao0803@gmail.com
                </p>
                <p className="mb-4 text-lg"> (024) 777.999.66</p>
                <p className="mb-4 text-lg">www.fu-stem.vercel.app</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
                  alt=""
                  className="h-[100px] w-[200px] object-cover"
                />
                <div className="mt-4 flex items-center gap-12">
                  <a href="https://www.facebook.com/FEExpSpace" target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt=""
                      className="h-[50px] w-[50px]"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@fpteducation"
                    target="_blank"
                  >
                    <img
                      src="https://thuviendohoa.vn/upload/images/items/logo-youtube-nut-phat-youtube-png-385.webp"
                      alt=""
                      className="h-[50px] w-[50px] rounded-full"
                    />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <a href="">Stemplus</a>
                <a href="">Liên hệ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Footer;
