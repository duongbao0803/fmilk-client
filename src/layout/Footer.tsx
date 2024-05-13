import React from "react";
import { MailOutlined } from "@ant-design/icons";

const Footer: React.FC = React.memo(() => {
  return (
    <>
      <div className="max-h-[400px]">
        <div className="background4 relative">
          <div className="absolute top-[100px]">
            <div className="grid grid-cols-3 px-48 justify-center text-white">
              <div>
                <p className="text-xl mb-4 font-bold">
                  Trường Đại học FPT Thành Phố Hồ Chí Minh
                </p>
                <p className="text-lg mb-4">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
                <p className="text-lg mb-4">
                  <MailOutlined /> {""} tonbao0803@gmail.com
                </p>
                <p className="text-lg mb-4"> (024) 777.999.66</p>
                <p className="text-lg mb-4">www.fu-stem.vercel.app</p>
              </div>
              <div className="flex items-center flex-col">
                <img
                  src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
                  alt=""
                  className="object-cover w-[200px] h-[100px]"
                />
                <div className="flex gap-12 mt-4 items-center">
                  <a href="https://www.facebook.com/FEExpSpace" target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt=""
                      className="w-[50px] h-[50px]"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@fpteducation"
                    target="_blank"
                  >
                    <img
                      src="https://thuviendohoa.vn/upload/images/items/logo-youtube-nut-phat-youtube-png-385.webp"
                      alt=""
                      className="w-[50px] h-[50px] rounded-full"
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
