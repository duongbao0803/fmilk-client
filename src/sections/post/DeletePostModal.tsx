import React from "react";
import { Modal } from "antd";

const DeletePostModal: React.FC<{
  deletePostItem: (id: string) => void;
  postId: string;
}> = ({ deletePostItem, postId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Delete Post",
    content: `Do you really want to delete? This post cannot be restored.`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deletePostItem(postId);
    },
  });
  return null;
};

export default DeletePostModal;
