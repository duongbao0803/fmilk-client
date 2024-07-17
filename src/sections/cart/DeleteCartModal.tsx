/* eslint-disable no-unused-vars */
import React from "react";
import { Modal } from "antd";
import { CartItem } from "@/interfaces/interface";

const DeleteCartModal: React.FC<{
  removeCart: (id: string) => void;
  record: CartItem;
}> = ({ removeCart, record }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa sản phẩm",
    content: `Bạn có chắc chắn muốn xóa ${record.name} khỏi giỏ hàng`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      removeCart(record._id);
    },
  });
  return null;
};

export default DeleteCartModal;
