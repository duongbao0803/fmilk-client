import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  StarOutlined,
  PoundCircleOutlined,
  BarsOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import useProductService from "@/services/productService";
import UploadImageProduct from "./UploadImageProduct";
import moment from "moment/moment";
import useBrandService from "@/services/brandService";
import { Countries } from "@/constant/constant";
import { formatDate } from "@/util/validate";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddProductModal: React.FC<AddModalProps> = (props) => {
  const [fileChange, setFileChange] = useState<string>("");
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { addNewProductItem } = useProductService();
  const { brands } = useBrandService();
  const { Option } = Select;
  const { TextArea } = Input;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const disabledDate = (current: object) => {
    return current && current < moment().startOf("day");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.dob);
      const updatedValues = { ...values, dob: formattedDate };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await addNewProductItem(updatedValues);
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
              name="expireDate"
              rules={[
                {
                  required: true,
                  message: "Please select expireDate",
                },
              ]}
              colon={true}
              label="Expire Date"
              labelCol={{ span: 24 }}
              className="formItem"
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

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please select brand",
                },
              ]}
              colon={true}
              label="Brand"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select placeholder="Select brand">
                {brands?.map((brand, index: number) => (
                  <Option
                    key={index}
                    value={`${brand?._id}`}
                    label={brand.brandName}
                  >
                    {`${brand?.brandName}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price",
                },
              ]}
              colon={true}
              label="Price"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <InputNumber
                className="w-full"
                type="number"
                prefix={
                  <PoundCircleOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Price"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity",
                },
              ]}
              colon={true}
              label="Quantity"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <InputNumber
                type="number"
                className="w-full"
                prefix={
                  <PoundCircleOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Quantity"
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
          <TextArea placeholder="Description" />
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
