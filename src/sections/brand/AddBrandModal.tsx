import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import useBrandService from "../../services/brandService";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddBrandModal: React.FC<AddModalProps> = React.memo((props) => {
  const { addNewBrandItem } = useBrandService();
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewBrandItem(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Add brand</p>}
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
            placeholder="Brand"
            className="p-2"
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddBrandModal;
