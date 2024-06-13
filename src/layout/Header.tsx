import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar } from "@/components";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("home");

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
      <div className="z-[999] mx-5 flex h-[60px] justify-center text-[#000000]">
        <div
          className="navbar flex w-[1100px] max-w-[1220px] flex-row flex-nowrap justify-between rounded-[40px] bg-[#f8f8f8] bg-opacity-75"
          data-aos="fade-down"
        >
          <img
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
            className="my-auto ml-4 h-fit w-[100px] cursor-pointer object-cover"
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
      </div>
      {/* <Notification visible={isNotificationVisible} onClose={closeNotification} /> */}
    </>
  );
});

export default Header;
