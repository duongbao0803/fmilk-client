import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { UserOutlined, PhoneOutlined, BankOutlined } from "@ant-design/icons";
import useProductService from "@/services/productService";
import UploadImageProduct from "./UploadImageProduct";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddProductModal: React.FC<AddModalProps> = (props) => {
  const [fileChange, setFileChange] = useState<string>("");

  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewProductItem } = useProductService();
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
          await addNewProductItem(values);
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
      title={<p className="text-lg text-[red]">Add new product</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
                {
                  min: 5,
                  message: "Name must be at least 5 characters",
                },
              ]}
              colon={true}
              label="Name"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Name"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="typeOfProduct"
              rules={[
                {
                  required: true,
                  message: "Please input typeOfProduct",
                },
              ]}
              colon={true}
              label="Type Of Product"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Phone"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input rating",
                },
              ]}
              colon={true}
              label="Rating"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Rating"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input typeOfProduct",
                },
              ]}
              colon={true}
              label="Quantity"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Quantity"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description",
            },
          ]}
          label="Description"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<BankOutlined className="site-form-item-icon mr-1" />}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Please select location",
            },
          ]}
          colon={true}
          label="Price"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<BankOutlined className="site-form-item-icon mr-1" />}
            placeholder="Price"
            maxLength={10}
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
          <UploadImageProduct
            onFileChange={handleFileChange}
            initialImage={""}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
