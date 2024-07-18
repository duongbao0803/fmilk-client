import { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UploadImagePost from "./UploadImagePost";
import usePostService from "@/services/postService";
import useProductService from "@/services/productService";
import { ProductInfo } from "@/interfaces/interface";

export interface AddPostModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddPostModal: React.FC<AddPostModalProps> = (props) => {
  const { Option } = Select;
  const [fileChange, setFileChange] = useState<string>("");
  const { products } = useProductService();
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewPostItem } = usePostService();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewPostItem(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
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
    form.resetFields();
  };

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Add new post</p>}
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
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
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
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
            placeholder="Description"
            autoFocus
          />
        </Form.Item>

        <Form.Item
          name="product"
          rules={[
            {
              required: true,
              message: "Please select product",
            },
          ]}
          colon={true}
          label="Product"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            showSearch
            placeholder="Please select product"
            optionFilterProp="children"
          >
            {products.map((product: ProductInfo, index: number) => (
              <Option key={index} value={`${product._id}`} label={product.name}>
                {`${product.name}`}
              </Option>
            ))}
          </Select>
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
          <UploadImagePost onFileChange={handleFileChange} initialImage={""} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
