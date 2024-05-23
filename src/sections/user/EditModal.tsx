import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, DatePicker } from "antd";
import { UserOutlined, PhoneOutlined, BankOutlined } from "@ant-design/icons";
import { formatDate } from "@/util/validate";
import useUserService from "@/services/userService";
import { UserInfo } from "@/interfaces/interface";
import moment from "moment/moment";
import dayjs from "dayjs";

interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const { setIsOpen, isOpen, userInfo } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateUserItem } = useUserService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      const updatedUserInfo = { ...userInfo };
      if (updatedUserInfo.dob) {
        updatedUserInfo.dob = dayjs(updatedUserInfo.dob);
      }
      form.setFieldsValue(updatedUserInfo);
    }
  }, [isOpen]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.dob);
      const updatedValues = { ...values, dob: formattedDate };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (userInfo && userInfo._id) {
            await updateUserItem(userInfo._id, updatedValues);
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
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const disabledDate = (current: object) => {
    return current && current > moment().startOf("day");
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Edit user</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
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
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon mr-1" />}
            placeholder="Name"
            autoFocus
          />
        </Form.Item>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone must be exactly 10 digits",
                },
              ]}
              colon={true}
              label="Phone"
              labelCol={{ span: 24 }}
              className="absolute"
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
              name="dob"
              colon={true}
              label="Date of birth"
              labelCol={{ span: 24 }}
            >
              <DatePicker
                picker="date"
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please select location",
            },
          ]}
          colon={true}
          label="Address"
          labelCol={{ span: 24 }}
        >
          <Input
            prefix={<BankOutlined className="site-form-item-icon mr-1" />}
            placeholder="Address"
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
