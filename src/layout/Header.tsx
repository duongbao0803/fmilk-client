import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { HomeFilled, DownOutlined } from "@ant-design/icons";
import { introItems, programItems, sourceItems } from "../constant/constant";
import { Avatar } from "@/components";

const Header: React.FC = React.memo(() => {
  const [isSelectedLink, setIsSelectedLink] = useState<boolean>(true);
  const [isSelectedContact, setIsSelectedContact] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");

  const handleLinkClick = () => {
    setIsSelectedLink(true);
    setIsSelectedContact(false);
    setSelectedDropdown("");
  };

  const handleSelectedContact = () => {
    setIsSelectedContact(true);
    setIsSelectedLink(false);
    setSelectedDropdown("");
  };

  const handleItemClick = (key: string) => {
    setSelectedDropdown(key);
    setIsSelectedLink(false);
    setIsSelectedContact(false);
  };

  return (
    <>
      <div className="flex justify-center text-[#000000] z-[999] h-[60px] mx-5">
        <div
          className="navbar flex flex-row flex-nowrap justify-between w-[1100px] max-w-[1220px] bg-[#f8f8f8] bg-opacity-75 rounded-[40px]"
          data-aos="fade-down"
        >
          <img
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
            alt=""
            className="w-[100px] h-fit object-cover my-auto ml-4"
          />
          <div className="flex items-center gap-3 p-4 text-[#1385b7] text-[18px] font-medium">
            <Link
              to="/home"
              onClick={handleLinkClick}
              className={`px-4 py-[10px] flex items-center rounded-2xl transition-all duration-500 text-[15px] hover:text-[#fff] hover:bg-[orange] ${
                isSelectedLink ? "bg-[orange] text-[#fff]" : ""
              }`}
            >
              <HomeFilled />
            </Link>
            <Dropdown
              overlay={
                <Menu>
                  {introItems &&
                    introItems.map((item) => (
                      <Menu.Item
                        key={item?.key}
                        onClick={() => handleItemClick(item?.key)}
                      >
                        <a
                          href={item?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.label}
                        </a>
                      </Menu.Item>
                    ))}
                </Menu>
              }
              className={`px-3 py-1 rounded-3xl cursor-pointer transition-all duration-500 hover:text-[#fff] ${
                selectedDropdown === "1" ||
                selectedDropdown === "2" ||
                selectedDropdown === "3"
                  ? "bg-[orange] text-[#fff]"
                  : ""
              }`}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  GIỚI THIỆU
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              overlay={
                <Menu>
                  {programItems &&
                    programItems.map((item) => (
                      <Menu.Item
                        key={item?.key}
                        onClick={() => handleItemClick(item.key)}
                      >
                        <a
                          href={item?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      </Menu.Item>
                    ))}
                </Menu>
              }
              className={`px-3 py-1 rounded-3xl cursor-pointer transition-all duration-500 hover:text-[#fff] ${
                selectedDropdown === "4" ||
                selectedDropdown === "5" ||
                selectedDropdown === "6"
                  ? "bg-[orange] text-[#fff]"
                  : ""
              }`}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  CHƯƠNG TRÌNH
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              overlay={
                <Menu>
                  {sourceItems &&
                    sourceItems.map((item) => (
                      <Menu.Item
                        key={item?.key}
                        onClick={() => handleItemClick(item.key)}
                      >
                        <a
                          href={item?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      </Menu.Item>
                    ))}
                </Menu>
              }
              className={`px-3 py-1 rounded-3xl cursor-pointer transition-all duration-500 hover:text-[#fff] ${
                selectedDropdown === "7" ||
                selectedDropdown === "8" ||
                selectedDropdown === "9"
                  ? "bg-[orange] text-[#fff]"
                  : ""
              }`}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  TÀI NGUYÊN
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link
              to="/home"
              onClick={handleSelectedContact}
              className={`px-3 py-1 rounded-3xl cursor-pointer transition-all duration-500 hover:text-[#fff] hover:bg-[orange] ${
                isSelectedContact ? "bg-[orange] text-[#fff]" : ""
              }`}
            >
              LIÊN HỆ
            </Link>
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
