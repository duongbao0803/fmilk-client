import React from "react";
import { Modal } from "antd";

const DeleteBrandModel: React.FC<{
  deleteBrandItem: (id: string) => void;
  brandId: string;
}> = ({ deleteBrandItem, brandId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Delete brand",
    content: `Do you want to delete this brand. This brand cannot restore`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteBrandItem(brandId);
    },
  });
  return null;
};

export default DeleteBrandModel;
