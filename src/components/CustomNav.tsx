import useStateStore from "@/hooks/useStateStore";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Tab {
  name: string;
  path: string;
}

const tabs: Tab[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/product" },
  { name: "Bài viết", path: "/post" },
  { name: "Liên hệ", path: "/contact" },
];

const CustomNav: React.FC = React.memo(() => {
  const [selected, setSelected] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const setCartState = useStateStore((state) => state.setCartState);

  useEffect(() => {
    const currentTab = tabs.find((tab) => {
      if (tab.path === "/product") {
        return location.pathname.startsWith(tab.path);
      } else if (tab.path === "/post") {
        return location.pathname.startsWith(tab.path);
      }
      return location.pathname === tab.path;
    });

    if (currentTab) {
      setSelected(currentTab.name);
    } else if (location.pathname === "/cart") {
      setSelected("");
    } else if (
      location.pathname === "/personal" ||
      location.pathname === "/password" ||
      location.pathname === "/ordered"
    ) {
      setSelected("");
    }
  }, [location]);

  const handleTabClick = (tab: Tab) => {
    setCartState(false);
    setSelected(tab.name);
    setTimeout(() => {
      navigate(tab.path);
    }, 250);
  };

  return (
    <div className="mt-4 flex flex-col flex-wrap items-center gap-2 font-medium lg:mt-0 lg:flex-row lg:space-x-8">
      {tabs.map((tab) => (
        <Nav
          text={tab.name}
          selected={selected === tab.name}
          onClick={() => handleTabClick(tab)}
          key={tab.name}
        />
      ))}
    </div>
  );
});

export interface CustomNavProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const Nav: React.FC<CustomNavProps> = ({ text, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-md px-2.5 py-0.5 text-sm transition-colors ${
        selected
          ? "bg-[#08cde9] text-white"
          : "text-black transition-all duration-300 ease-in-out hover:bg-[#08cde9] hover:text-white"
      }`}
    >
      <span className="relative z-10 text-xl font-medium">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 h-full w-full rounded-md bg-[#08cde9]"
        />
      )}
    </button>
  );
};

export default CustomNav;