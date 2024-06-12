import React from "react";
import { ChromeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Footer: React.FC = React.memo(() => {
  return (
    <>
      <div className="grid h-[300px] bg-[#1CC8DC]">
        <div className="grid grid-cols-3 items-center justify-center px-48 text-white">
          <div>
            <p className="mb-4 text-xl font-bold">
              FMILK - DINH DƯỠNG CHO MỌI NHÀ
            </p>
            <p className="mb-4 text-sm">
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành
              phố Hồ Chí Minh
            </p>
            <p className="mb-4 text-sm">
              <MailOutlined /> {""} tonbao0803@gmail.com
            </p>
            <p className="mb-4 text-sm">
              <PhoneOutlined className="rotate-90" /> (024) 777.999.66
            </p>
            <p className="mb-4 text-sm">
              <ChromeOutlined /> www.fmilk.vercel.app
            </p>
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
              <a href="https://www.youtube.com/@fpteducation" target="_blank">
                <img
                  src="https://thuviendohoa.vn/upload/images/items/logo-youtube-nut-phat-youtube-png-385.webp"
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center text-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530492!2d106.80730807486965!3d10.84113285799728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1718182126450!5m2!1sen!2s"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[250px] w-[300px] border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
});

export default Footer;
