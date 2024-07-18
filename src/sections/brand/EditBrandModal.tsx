import { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import React from "react";
import useBrandService from "../../services/brandService";
import { DataType } from "./BrandList";
import { Countries } from "@/constant/constant";

export interface EditBrandModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  brandInfo: DataType;
}

const EditBrandModal: React.FC<EditBrandModalProps> = (props) => {
  const { setIsOpen, isOpen, brandInfo } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { updateBrandItem } = useBrandService();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(brandInfo);
    }
  }, [isOpen]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await updateBrandItem(brandInfo._id, values);
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
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Edit brand</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="brandName"
          rules={[
            {
              required: true,
              message: "Please input brand name",
            },
          ]}
          colon={true}
          label="Brand name"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<BarcodeOutlined className="site-form-item-icon mr-1" />}
            placeholder="Brand name"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="origin"
          rules={[
            {
              required: true,
              message: "Please select origin",
            },
          ]}
          colon={true}
          label="Origin"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select placeholder="Select brand">
            {Countries?.map((country, index: number) => (
              <Option key={index} value={country} label={country}>
                {country}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBrandModal;
