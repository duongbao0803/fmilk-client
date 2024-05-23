/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, notification } from "antd";
import "aos/dist/aos.css";
import Signin from "./Signin";
import { SignupProps, SignupValues } from "@/interfaces/interface";
import { signUp } from "@/api/authenApi";
import { validatePhoneNumber } from "@/util/validate";

const Signup: React.FC<SignupProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [, setValues] = useState<SignupValues>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

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

  const onFinish = (values: SignupValues) => {
    setValues(values);
    if (values?.username && values?.name && values?.email && values?.password) {
      handleSignup(values);
    }
  };

  const handleSignup = async (formValues: SignupValues) => {
    try {
      const res = await signUp(formValues);
      if (res && res.status === 200) {
        notification.success({
          message: "Signup Successful",
          description: "You have successfully signed up.",
          duration: 2,
        });
        setIsShowRegister(false);
      }
    } catch (err: any) {
      notification.error({
        message: "Signup Failed",
        description: `${err.response.data.message}`,
        duration: 2,
      });
      console.error("Error signing up user", err);
    }
  };

  return (
    <>
      {isShowRegister ? (
        <>
          <div data-aos="fade-down">
            <h1 className=" mb-5 text-center text-4xl font-bold text-[#1677ff]">
              SIGN UP
            </h1>
          </div>
          <Form name="normal_login" form={form} onFinish={onFinish}>
            <Row gutter={16} className="relative">
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username",
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
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                      className="p-2"
                      autoFocus
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name",
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
                      prefix={<AuditOutlined className="site-form-item-icon" />}
                      placeholder="Name"
                      className="p-2"
                      autoFocus
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={16} className="relative">
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="email"
                    id="formItem"
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
                    label="Email"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      className="p-2"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div data-aos="fade-right">
                  <Form.Item
                    name="phone"
                    id="formItem"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone",
                      },
                      { validator: validatePhoneNumber },
                    ]}
                    label="Phone"
                    labelCol={{ span: 24 }}
                    className="formItem"
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Phone number"
                      className="p-2"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div data-aos="fade-right">
              <Form.Item
                name="address"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Please input your address",
                  },
                ]}
                label="Address"
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Address"
                  className="p-2"
                />
              </Form.Item>
            </div>
            <div data-aos="fade-right">
              <Form.Item
                name="password"
                id="formItem"
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
                className="formItem"
                colon={true}
                label="Password"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
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
            </div>
            <div data-aos="fade-right">
              <Form.Item
                name="confirmPassword"
                id="formItem"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
                className="formItem"
                colon={true}
                label="Confirm password"
                labelCol={{ span: 24 }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="p-2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
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
            </div>
            <div data-aos="fade-left">
              <Form.Item id="form-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button mx-auto mt-2 block h-11 w-full text-lg tracking-wider"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="text-center text-sm">
            You already have an account? {""}
            <a
              href="#"
              className="font-semibold text-[#3094ff] hover:underline"
              onClick={() => setIsShowRegister(false)}
            >
              Sign In
            </a>
          </div>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default Signup;
