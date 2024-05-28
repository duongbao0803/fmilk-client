/* eslint-disable no-unused-vars */
import React from "react";
import { Modal } from "antd";

const DeleteModal: React.FC<{
  deleteUserItem: (id: string) => void;
  userId: string;
}> = ({ deleteUserItem, userId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Delete Product",
    content: `Do you really want to delete? This user cannot be restored.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteUserItem(userId);
    },
  });
  return null;
};

export default DeleteModal;
