import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa'; // Importing FontAwesome Trash Icon
import { Link } from 'react-router-dom';

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
          <div className="cart bg-white shadow-md rounded-lg p-8 mb-8 max-w-4xl">
            <h2 className="text-lg font-semibold mb-4">Giỏ Hàng</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <span className="text-lg font-semibold">Sản Phẩm</span>
              </div>
              <div className="col-span-1">
                <span className="text-lg font-semibold ml-32 whitespace-nowrap">Đơn Giá</span>
              </div>
              <div className="col-span-1">
                <span className="text-lg font-semibold ml-20 whitespace-nowrap">Số Lượng</span>
              </div>
              <div className="col-span-1">
                <span className="text-lg font-semibold ml-24 whitespace-nowrap">Thành Tiền</span>
              </div>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <div className="col-span-1 flex items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                      <span className="text-lg whitespace-nowrap">{item.name}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="text-lg ml-36">${item.price}</span>
                    </div>
                    <div className="col-span-1 flex items-center ml-24">
                      <button onClick={() => decreaseQuantity(index)} className="text-lg ml-2 text-blue-500 focus:outline-none">-</button>
                      <span className="text-lg ml-2">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(index)} className="text-lg ml-2 text-red-500 focus:outline-none">+</button>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="text-lg ml-28">${item.price * item.quantity}</span>
                      <button onClick={() => removeItem(index)} className="text-lg ml-4 text-red-500 focus:outline-none">
                        <FaTrashAlt />
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
            <div className="bg-white shadow-md rounded-lg p-8 mb-8">
              <label className="block text-lg font-semibold mb-2">Mã Giảm Giá</label>
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscountCode} className="bg-blue-500 text-white px-4 py-1 rounded-md w-full">Áp Dụng</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Đơn Hàng</h3>
              <div className="flex justify-between mb-2">
                <span className="text-lg">Tổng Giá Sản Phẩm</span>
                <span className="text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-lg">Phí Vận Chuyển</span>
                <span className="text-lg">${SHIPPING_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-lg">Tạm Tính</span>
                <span className="text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
              <button  className="bg-blue-500 text-white px-4 py-1 rounded-md w-full">Tiếp Tục</button>
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
