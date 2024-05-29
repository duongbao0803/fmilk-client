import { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { FormOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { DataType } from "./PostList";
import usePostService from "@/services/postService";
import UploadImagePost from "./UploadImagePost";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  postInfo?: DataType;
}

const EditPostModal: React.FC<EditModalProps> = (props) => {
  const { setIsOpen, isOpen, postInfo } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updatePostItem } = usePostService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(postInfo);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (postInfo && postInfo._id) {
            await updatePostItem(postInfo._id, values);
            setIsConfirmLoading(false);
            setIsOpen(false);
          } else {
            console.error("User is undefined");
          }
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Edit post</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input title",
            },
            {
              min: 5,
              message: "Title must be at least 5 characters",
            },
          ]}
          colon={true}
          label="Title"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<FormOutlined className="site-form-item-icon mr-1" />}
            placeholder="Title"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description",
            },
            {
              min: 5,
              message: "Title must be at least 5 characters",
            },
          ]}
          colon={true}
          label="Description"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={
              <UnorderedListOutlined className="site-form-item-icon mr-1" />
            }
            placeholder="Description"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Please select image",
            },
          ]}
          colon={true}
          label="Image"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImagePost
            onFileChange={handleFileChange}
            initialImage={postInfo?.image}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
