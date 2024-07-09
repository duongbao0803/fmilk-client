import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Tab = {
  name: string;
  path: string;
};

const tabs: Tab[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/product" },
  { name: "Bài viết", path: "/blog" },
  { name: "Liên hệ", path: "/contact" },
];

const ChipTabs = () => {
  const [selected, setSelected] = useState("");

  const location = useLocation();

  useEffect(() => {
    const currentTab = tabs.find((tab) =>
      location.pathname.startsWith(tab.path),
    );
    if (currentTab) {
      setSelected(currentTab.name);
    }
    if (location.pathname === '/cart') {
      setSelected('');
    }
  }, [location]);

  const handleTabClick = async (tab: Tab) => {
    setSelected(tab.name);
  };

  return (
    <div className="flex flex-wrap items-center gap-6">
      {tabs.map((tab) => (
        <Chip
          text={tab.name}
          selected={selected === tab.name}
          onClick={() => handleTabClick(tab)}
          key={tab.name}
        />
      ))}
    </div>
  );
};

type ChipProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
  icon?: JSX.Element; // Optional icon prop
};

const Chip: React.FC<ChipProps> = ({ text, selected, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-md px-2.5 py-0.5 text-sm transition-colors ${
        selected
          ? "bg-[#08cde9] text-white"
          : "text-black hover:bg-[#08cde9] hover:text-white"
      }`}
    >
      <span className="relative z-10 text-xl font-medium">
        {icon}
        {text}
      </span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-[#08cde9]"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
