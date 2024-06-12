import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import React, { useEffect, useState } from "react";
// import { FaTrashAlt } from 'react-icons/fa'; // Importing FontAwesome Trash Icon
import { Link } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");

  const SHIPPING_FEE = 30;

  useEffect(() => {
    // Lấy giỏ hàng từ Local Storage khi trang được tải lại
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render

  const decreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity - 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyDiscountCode = () => {
    console.log("Áp dụng mã giảm giá:", discountCode);
    setDiscountCode("");
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();
  const subtotal = totalPrice + SHIPPING_FEE;

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-center gap-4">
          <div className="cart mb-8 max-w-4xl rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Giỏ Hàng</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <span className="text-lg font-semibold">Sản Phẩm</span>
              </div>
              <div className="col-span-1">
                <span className="ml-32 whitespace-nowrap text-lg font-semibold">
                  Đơn Giá
                </span>
              </div>
              <div className="col-span-1">
                <span className="ml-20 whitespace-nowrap text-lg font-semibold">
                  Số Lượng
                </span>
              </div>
              <div className="col-span-1">
                <span className="ml-24 whitespace-nowrap text-lg font-semibold">
                  Thành Tiền
                </span>
              </div>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <div className="col-span-1 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="mr-4 h-20 w-20 object-cover"
                      />
                      <span className="whitespace-nowrap text-lg">
                        {item.name}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="ml-36 text-lg">${item.price}</span>
                    </div>
                    <div className="col-span-1 ml-24 flex items-center">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="ml-2 text-lg text-blue-500 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="ml-2 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="ml-2 text-lg text-red-500 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="ml-28 text-lg">
                        ${item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-lg text-red-500 focus:outline-none"
                      >
                        {/* <FaTrashAlt /> */}
                      </button>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <div className="col-span-4">
                  <p className="text-lg">Giỏ Hàng Của Bạn Trống.</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/4">
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
                onClick={applyDiscountCode}
                className="w-full rounded-md bg-blue-500 px-4 py-1 text-white"
              >
                Áp Dụng
              </button>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-lg font-semibold">Thông Tin Đơn Hàng</h3>
              <div className="mb-2 flex justify-between">
                <span className="text-lg">Tổng Giá Sản Phẩm</span>
                <span className="text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-lg">Phí Vận Chuyển</span>
                <span className="text-lg">${SHIPPING_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-lg">Tạm Tính</span>
                <span className="text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <button className="w-full rounded-md bg-blue-500 px-4 py-1 text-white">
                  Tiếp Tục
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
