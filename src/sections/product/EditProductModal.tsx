import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import { UserOutlined, PoundCircleOutlined } from "@ant-design/icons";
import { DataType } from "./ProductList";
import useProductService from "@/services/productService";
import UploadImageProduct from "./UploadImageProduct";
import useBrandService from "@/services/brandService";
import { Countries } from "@/constant/constant";
import moment from "moment";
import dayjs from "dayjs";
import { formatDate } from "@/util/validate";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  productInfo?: DataType;
}

const EditProductModal: React.FC<EditModalProps> = (props) => {
  const { setIsOpen, isOpen, productInfo } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const { updateProductItem } = useProductService();
  const [form] = Form.useForm();
  const { brands } = useBrandService();
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    if (isOpen) {
      const updatedProductInfo = { ...productInfo };
      if (updatedProductInfo.expireDate) {
        updatedProductInfo.expireDate = dayjs(updatedProductInfo.expireDate);
      }
      form.setFieldsValue(updatedProductInfo);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const disabledDate = (current: object) => {
    return current && current < moment().startOf("day");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = formatDate(values.expireDate);
      const updatedValues = { ...values, expireDate: formattedDate };
      console.log("check", updatedValues);
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          if (productInfo && productInfo._id) {
            await updateProductItem(productInfo._id, updatedValues);
            setIsConfirmLoading(false);
            setIsOpen(false);
          } else {
            console.error("Product is undefined");
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
      title={<p className="text-lg text-[red]">Edit product</p>}
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
                {brands?.map(
                  (
                    brand: { _id: unknown; brandName: unknown },
                    index: number,
                  ) => (
                    <Option
                      key={index}
                      value={`${brand?._id}`}
                      label={brand.brandName}
                    >
                      {`${brand?.brandName}`}
                    </Option>
                  ),
                )}
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
            initialImage={productInfo?.image}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
