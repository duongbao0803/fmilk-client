import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";
import Signup from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);

  const handleClick = (): void => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then((data) => {
      console.log("check data", data);
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isShowForgotPassword ? (
        <ForgotPasswordForm
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      ) : !isShowRegister ? (
        <>
          <div className="">
            <div data-aos="fade-down">
              <h1 className=" mb-5 text-4xl font-bold text-[#1677ff]">
                Welcome Back
              </h1>
            </div>
            <Form name="normal_login" className="login-form">
              <div data-aos="fade-right">
                <Form.Item
                  name=""
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                    {
                      min: 8,
                      message: "Username must be at least 8 characters",
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
              <div data-aos="fade-right">
                <Form.Item
                  name=""
                  id="formItem"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                  label="Password"
                  labelCol={{ span: 24 }}
                  className="formItem"
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
              <div data-aos="fade-left">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                  <a
                    href="#"
                    className="login-form-forgot float-right font-semibold text-[#3094ff] hover:underline"
                    onClick={() => setIsShowForgotPassword(true)}
                  >
                    Forgot password?
                  </a>
                </Form.Item>
              </div>
              <Form.Item>
                <div data-aos="fade-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button mx-auto mt-5 block h-11 w-full text-lg tracking-wider"
                  >
                    Sign In
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <div data-aos="flip-up">
              <div className="mt-4 flex items-center justify-center text-center">
                <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                <span className="text-[#999999]">OR</span>
                <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div>
                <Button
                  className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none"
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center tracking-wider">
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      width={23}
                      alt=""
                      className="mr-2"
                    />
                    Continue with Google
                  </div>
                </Button>
              </div>
            </div>
            <div data-aos="fade-up">
              <div className="mt-2 text-center text-sm">
                <span>You don't have account? </span>
                <a
                  href="#"
                  className="font-semibold text-[#3094ff] hover:underline"
                  onClick={() => setIsShowRegister(true)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Signup
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default Signin;
