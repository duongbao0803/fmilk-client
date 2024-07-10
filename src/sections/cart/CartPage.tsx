import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification, Table, TableProps } from "antd";
import { DataType } from "../user/UserList";
import {
  HomeFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import useCartStore from "@/hooks/useCartStore";
import { PriceFormat } from "@/util/validate";

const CartPage: React.FC = () => {
  const [discountCode, setDiscountCode] = useState<string>("");
  const { cart, addToCart, itemsPrice, removeCart } = useCartStore();
  const navigate = useNavigate();

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

  const columns: TableProps<DataType>["columns"] = [
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
        <div className="flex items-center justify-center">
          <MinusCircleOutlined
            onClick={() => removeCart(record._id)}
            className="text-xl text-[black]"
          />
          <span className="text-md mx-2">{record.quantity}</span>
          <PlusCircleOutlined
            className="text-xl text-[#08cde9]"
            onClick={() => addToCart(record)}
          />
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

  const handleCart = () => {
    if (cart.length <= 0) {
      notification.warning({
        message: "Không thể thực hiện",
        description: "Quý khách vui lòng thêm sản phẩm vào giỏ hàng",
        duration: 2,
      });
      return;
    }
    navigate("/checkout");
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
              <h1 className="text-4xl font-bold text-white">GIỎ HÀNG</h1>
            </div>
          </div>
        </div>

        <div className="mx-40 min-h-screen">
          <div className="mb-5">
            <Link to={"/"}>
              <HomeFilled className="text-xl text-[#08cde9]" />
            </Link>
            <RightOutlined className="mx-2 text-[#08cde9]" />
            <span className="font-bold">Giỏ hàng của bạn</span>
          </div>
          <div className="grid grid-cols-3 gap-4 ">
            <div className="cart col-span-2 rounded-lg bg-white">
              <Table
                className="pagination h-full"
                id="myTable"
                columns={columns}
                dataSource={cart}
                pagination={false}
              />
            </div>
            <div className="col-span-1">
              <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
                <label className="mb-2 block text-lg font-semibold">
                  Mã Giảm Giá
                </label>
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="mb-2 w-full rounded-md border border-gray-300 px-2 py-1"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  // onClick={applyDiscountCode}
                  className="w-full rounded-md bg-blue-500 px-4 py-1 text-white"
                >
                  Áp Dụng
                </button>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">
                  Thông Tin Đơn Hàng
                </h3>
                <div className="mb-2 flex justify-between">
                  <span className="text-lg">Tổng Giá Sản Phẩm</span>
                  <span className="text-lg">
                    {" "}
                    {PriceFormat.format(itemsPrice ?? 0)}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-lg">Phí Vận Chuyển</span>
                  {transferPrice === 0
                    ? "Miễn phí"
                    : `${PriceFormat.format(transferPrice)}`}
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-lg">Tạm Tính</span>
                  {PriceFormat.format(subtotal)}
                </div>
                <Button
                  onClick={handleCart}
                  className="bpx-4 w-full rounded-md py-1"
                  type="primary"
                >
                  Tiếp Tục
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
