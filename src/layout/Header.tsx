import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, ChipTabs } from "@/components";
import logo from "@/assets/images/logo/logo_fmilk_web.png";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const [, setSelectedOption] = useState("home");

  const handleLinkClick = () => {
    setSelectedOption("home");
    navigate("/");
  };

  const handleSelectedCart = () => {
    setSelectedOption("cart");
    navigate("/cart");
  };

  // const showNotification = () => {
  //   setIsNotificationVisible(true);
  // };

  // const closeNotification = () => {
  //   setIsNotificationVisible(false);
  // };

  return (
    <>
      {/* <div className="z-[999] mx-5 flex h-[60px] justify-center text-[#000000]">
        <div
          className="navbar flex w-[1100px] max-w-[1220px] flex-row flex-nowrap justify-between rounded-[40px] bg-[#f8f8f8] bg-opacity-75"
          data-aos="fade-down"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/swd392-d2c4e.appspot.com/o/FTravel%2FLogo_FTravel_3.png?alt=media&token=744b0241-f414-4139-affa-5c523c3bcbc2"
            alt=""
            className="my-auto ml-5 h-fit w-[40px] cursor-pointer object-cover"
            onClick={handleLinkClick}
          />
          <div className="flex items-center gap-3 p-4 text-[18px] font-medium text-black">
            <div
              onClick={handleLinkClick}
              className={`flex cursor-pointer items-center rounded-2xl px-4 py-[10px] text-[15px] transition-all duration-500 hover:bg-[orange] hover:text-[#fff] ${
                selectedOption === "home" ? "bg-[orange] text-[#fff]" : ""
              }`}
            >
              <HomeFilled />
            </div>

            <div
              onClick={handleSelectedCart}
              className={`dropdownHeader cursor-pointer rounded-3xl px-3 py-1 transition-all duration-500 hover:bg-[orange] hover:text-[#fff] ${
                selectedOption === "cart" ? "bg-[orange] text-[#fff]" : ""
              }`}
            >
              <Badge count={5}>
                <ShoppingCartOutlined
                  className={`text-2xl text-black hover:text-white ${selectedOption === "cart" ? "text-[#fff]" : ""}`}
                />
              </Badge>
            </div>
            <Avatar />
          </div>
        </div>
      </div> */}
      <nav className="fixed z-[999] w-full border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <img
            src={logo}
            alt="logo"
            className="my-auto ml-5 h-fit w-[40px] cursor-pointer object-cover"
            onClick={handleLinkClick}
          />
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {/* <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Get started
            </button> */}
            <div className="flex items-center justify-center gap-8">
              <div onClick={handleSelectedCart}>
                <Badge count={5}>
                  <ShoppingCartOutlined className="cursor-pointer text-2xl text-black hover:text-[#08cde9]" />
                </Badge>
              </div>
              <div>
                <Avatar />
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden "
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-cta"
          >
            {/* <ul className="md mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className="block rounded bg-blue-700 px-3 py-2 font-semibold text-white md:bg-transparent md:p-0 md:text-[#08cde9] "
                  aria-current="page"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded px-3 py-2 font-semibold text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#08cde9] "
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded px-3 py-2 font-semibold text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#08cde9]"
                >
                  Tin tức
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded px-3 py-2 font-semibold text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#08cde9]"
                >
                  Liên hệ
                </a>
              </li>
            </ul> */}
            <ChipTabs />
          </div>
        </div>
      </nav>
      {/* <Notification visible={isNotificationVisible} onClose={closeNotification} /> */}
    </>
  );
});

export default Header;
