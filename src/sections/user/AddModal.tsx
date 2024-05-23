import { useState } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  MailOutlined,
  BankOutlined,
  AuditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { validatePhoneNumber } from "@/util/validate";
import useUserService from "@/services/userService";
import { AddModalProps } from "@/interfaces/interface";
import { roles } from "@/constant/constant";

const AddModal: React.FC<AddModalProps> = (props) => {
  const { setIsShow, isShow } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewUserItem } = useUserService();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [form] = Form.useForm();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Passwords do not match");
    }
    return Promise.resolve();
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewUserItem(values);
          setIsConfirmLoading(false);
          setIsShow(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsShow(true);
        }
      }, 1000);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsShow(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Add new user</p>}
      open={isShow}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative">
          <Col span={12}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input username",
                },
                {
                  min: 8,
                  message: "Must be at least 8 characters",
                },
                {
                  max: 30,
                  message: "Must not exceed 30 characters",
                },
                {
                  pattern: /^[^\s]+$/,
                  message: "Username cannot contain spaces",
                },
                {
                  pattern: /^[a-z0-9]+$/,
                  message: "Username cannot contain special characters",
                },
              ]}
              colon={true}
              label="Username"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Username"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
                {
                  min: 8,
                  message: "Must be at least 8 characters",
                },
              ]}
              colon={true}
              label="Name"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<AuditOutlined className="site-form-item-icon mr-1" />}
                placeholder="Name"
                autoFocus
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone",
                },
                { validator: validatePhoneNumber },
              ]}
              colon={true}
              label="Phone"
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
          <Col span={12}>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input role",
                },
              ]}
              colon={true}
              label="Role"
              labelCol={{ span: 24 }}
              className="formItem w-full"
            >
              <Select options={roles} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
              colon={true}
              label="Email"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="url"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input address",
                },
              ]}
              colon={true}
              label="Address"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<BankOutlined className="site-form-item-icon mr-1" />}
                placeholder="url"
                autoFocus
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
          colon={true}
          label="Password"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon mr-1" />}
            autoFocus
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            suffix={
              <>
                {showPassword ? (
                  <EyeInvisibleOutlined onClick={togglePassword} />
                ) : (
                  <EyeOutlined onClick={togglePassword} />
                )}
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirm password",
            },
            {
              validator: validatePassword,
            },
          ]}
          colon={true}
          label="Confirm password"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon mr-1" />}
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            suffix={
              <>
                {showConfirmPassword ? (
                  <EyeInvisibleOutlined onClick={toggleConfirmPassword} />
                ) : (
                  <EyeOutlined onClick={toggleConfirmPassword} />
                )}
              </>
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
