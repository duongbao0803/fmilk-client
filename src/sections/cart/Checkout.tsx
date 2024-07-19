import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  notification,
  Radio,
  RadioChangeEvent,
  Table,
  TableProps,
} from "antd";
import { HomeFilled, RightOutlined } from "@ant-design/icons";
import useCartStore from "@/hooks/useCartStore";
import { PriceFormat } from "@/util/validate";
import { CartItem } from "@/interfaces/interface";
import LogoVnpay from "@/assets/images/logo/logo_vnpay.png";
import LogoCash from "@/assets/images/logo/logo_cash.png";
import useAuth from "@/hooks/useAuth";
import { createOrder } from "@/api/orderApi";

const Checkout: React.FC = () => {
  const testPrice = localStorage.getItem("cart");
  const parseJson = JSON.parse(testPrice);
  const { cart, itemsPrice } = useCartStore();
  const [value, setValue] = useState("");
  const { infoUser } = useAuth();

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const TRANSFER_FEE = [
    { min: 2000000, fee: 0 },
    { min: 1500000, max: 2000000, fee: 20000 },
    { min: 1000000, max: 1500000, fee: 40000 },
    { max: 1000000, fee: 60000 },
    { min: 0, fee: 0 },
  ];

  const getShippingFee = (itemsPrice: number) => {
    for (let i = 0; i < TRANSFER_FEE.length; i++) {
      const { min = 0, max = Infinity, fee } = TRANSFER_FEE[i];
      if (itemsPrice >= min && itemsPrice < max) {
        return fee;
      }
    }
    return 0;
  };

  const transferPrice = getShippingFee(itemsPrice);
  const subtotal = itemsPrice + transferPrice;

  const columns: TableProps<CartItem>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record?.image}
            alt={record.name}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_text, record) => (
        <div className="flex items-center">
          <span className="text-md mx-2">{record.quantity}</span>
        </div>
      ),
    },
    {
      title: "Tổng cộng",
      dataIndex: "totalProductPrice",
      render: (totalProductPrice) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalProductPrice)}
        </span>
      ),
    },
  ];
  const filteredArray = cart.map(({ _id, quantity }) => ({ _id, quantity }));
  const updatedProducts = filteredArray.map((product) => ({
    productId: product._id,
    amount: product.quantity,
  }));

  console.log(updatedProducts);

  const [data] = useState({
    transferAddress: {
      fullName: infoUser?.username,
      address: infoUser?.address,
      phone: infoUser?.phone,
    },
    orderProducts: updatedProducts,
    userId: infoUser._id,
    paymentMethod: "VNPAY",
    itemsPrice: parseJson.state.itemsPrice,
    transferPrice: transferPrice,
    totalPrice: subtotal,
  });

  const handlePayment = async () => {
    try {
      const formValues = data;
      const res = await createOrder(formValues);
      if (res && res.status === 200) {
        notification.success({
          message: "Tạo đơn hàng thành công",
          description:
            "Đơn hàng đã được tạo thành công! Chuyển hướng đến trang thanh toán trong 3 giây...",
          duration: 2,
        });

        setTimeout(() => {
          window.location.href = res.data.data;
        }, 3000);
      }
    } catch (err) {
      console.error("Err payment", err);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="h-[600px]">
          <div className="background4 relative top-[69.5px]">
            <div className="text-center">
              <h4 className="py-3 text-3xl font-semibold tracking-widest text-[#08cde9]">
                FMILK
              </h4>
              <h1 className="text-4xl font-bold text-white">THANH TOÁN</h1>
            </div>
          </div>
        </div>

        <div className="mx-10 mb-16 min-h-screen md:mx-36">
          <div className="mb-5">
            <Link to={"/"}>
              <HomeFilled className="text-xl text-[#08cde9]" />
            </Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <Link to={"/cart"}>Giỏ hàng của bạn</Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <span className="font-bold">Thanh toán</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="cart col-span-2 rounded-lg bg-white">
              <div>
                <div className="col-span-3 mb-5">
                  <Form>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="col-span-3 mb-5">
                        <div className="rounded-lg bg-white p-4 shadow-md">
                          <label className="mb-2 block text-[14px] font-semibold">
                            Thông tin người dùng
                          </label>
                          <Form.Item
                            label="Tên"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên của bạn",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập tên của bạn" />
                          </Form.Item>
                          <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập địa chỉ của bạn",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập địa chỉ của bạn" />
                          </Form.Item>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số điện thoại của bạn",
                              },
                            ]}
                          >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                          </Form.Item>
                          <Button
                            className="h-10 rounded-md"
                            type="primary"
                            htmlType="submit"
                          >
                            Xác nhận thông tin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
                <div>
                  <strong>Đơn hàng của bạn</strong>
                  <Table
                    id="myTable"
                    columns={columns}
                    dataSource={cart}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="rounded-lg bg-white shadow-md">
                <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                  Thông tin đơn hàng
                </label>
                <div className="mb-5 px-5 py-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-md">Tổng Giá Sản Phẩm</span>
                    <span className="text-md">
                      {" "}
                      {PriceFormat.format(itemsPrice ?? 0)}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-md">Phí Vận Chuyển</span>
                    {transferPrice === 0
                      ? "Miễn phí"
                      : `${PriceFormat.format(transferPrice)}`}
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-md">Tạm Tính</span>
                    {PriceFormat.format(subtotal)}
                  </div>
                </div>
              </div>
              <div className="mb-8 rounded-lg shadow-md">
                <label className="block rounded-lg rounded-bl-none rounded-br-none bg-[#fafafa] p-4 text-[14px] font-semibold">
                  Phương thức thanh toán
                </label>
                <div className="px-5 py-3">
                  <Radio.Group onChange={onChange} className="w-full">
                    <div className="relative mb-5 flex w-full items-center justify-between rounded-lg border border-[#bebcbc] p-5 hover:border-[#08a2e9]">
                      <Radio value={"VNPAY"} className="w-full">
                        <div className="inline w-full">
                          <div className="border-1 w-full">
                            Thanh toán VNPAY
                          </div>
                        </div>
                      </Radio>
                      <div className="ml-4">
                        <img
                          src={LogoVnpay}
                          alt="Logo-vnpay"
                          className="w-11"
                        />
                      </div>
                    </div>

                    <div className="relative flex w-full items-center justify-between rounded-lg border border-[#bebcbc] p-5 hover:border-[#08a2e9]">
                      <Radio value={"CASH"} className="w-full">
                        <div className="inline w-full">
                          <div className="border-1 w-full">
                            Thanh toán khi nhận hàng
                          </div>
                        </div>
                      </Radio>
                      <div className="ml-4">
                        <img src={LogoCash} alt="Logo-cash" className="w-11" />
                      </div>
                    </div>
                  </Radio.Group>
                  <div className="mt-5 flex gap-2">
                    <input type="checkbox" required />
                    <p className="text-sm">
                      Vui lòng xác nhận lại đơn hàng trước khi thanh toán
                    </p>
                  </div>
                  <Button
                    className="mt-5 h-10 w-full rounded-md py-1"
                    type="primary"
                    onClick={handlePayment}
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
