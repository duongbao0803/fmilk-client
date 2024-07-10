import React from "react";
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { UserInfo } from "@/interfaces/interface";
import { Role } from "@/enums/enum";
import useAuth from "@/hooks/useAuth";
import avatarAdmin from "@/assets/images/logo/avatar_admin.jpg";
import avatarStaff from "@/assets/images/logo/avatar_staff.jpg";
import avatarUser from "@/assets/images/logo/avatar_user.jpg";

const Avatar: React.FC = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const infoUser = useAuth((state) => state.infoUser);
  const logout = useAuth((state) => state.logout);

  const { username, email, role } = infoUser as UserInfo;

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="pointer-events-none hover:bg-transparent">
          <p>{username || "username"}</p>
          <p>{email || "email"}</p>
        </div>
      ),
      key: "0",
      disabled: true,
    },
    {
      label:
        role === Role.ADMIN || role === Role.STAFF ? (
          <Link to="/chart">Dashboard</Link>
        ) : (
          <Link to="/profile">View profile</Link>
        ),
      key: "1",
    },
    {
      label: (
        <Link to="/authen" rel="noopener noreferrer" onClick={logout}>
          Đăng xuất
        </Link>
      ),
      key: "2",
    },
  ];
  return (
    <>
      {isAuthenticated ? (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          className="hover:bg-transparent"
        >
          {role === Role.ADMIN ? (
            <img
              src={avatarAdmin}
              alt="avatar"
              className="h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-gray-300 hover:ring-[#08cde9]"
            />
          ) : role === Role.STAFF ? (
            <img
              src={avatarStaff}
              alt="avatar"
              className="h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-gray-300 hover:ring-[#08cde9]"
            />
          ) : (
            <img
              src={avatarUser}
              alt="avatar"
              className="h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-gray-300 hover:ring-[#08cde9]"
            />
          )}
        </Dropdown>
      ) : (
        <Link to="/authen">
          <button className="buttonAuthen">ĐĂNG NHẬP</button>
        </Link>
      )}
    </>
  );
};

export default Avatar;
