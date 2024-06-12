import React, { useEffect, useState } from "react";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [emptyCartMessage, setEmptyCartMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(3);

  const SHIPPING_FEE = 30;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      if (parsedCart.length === 0) {
        setEmptyCartMessage("Giỏ hàng của bạn trống. Bạn sẽ trở về trang Home trong");
        setCountdown(3);
      }
    } else {
      setEmptyCartMessage("Giỏ hàng của bạn trống. Bạn sẽ trở về trang Home trong");
      setCountdown(3);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emptyCartMessage) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate("/");
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [emptyCartMessage, navigate]);

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
    if (updatedCart.length === 0) {
      setEmptyCartMessage("Giỏ hàng của bạn trống. Bạn sẽ trở về trang Home trong");
      setCountdown(3);
    }
  };

  const applyDiscountCode = () => {
    console.log("Áp dụng mã giảm giá:", discountCode);
    setDiscountCode("");
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const truncateProductName = (name: string, length: number) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  const handleButtonClick = () => {
    if (cart.length > 0) {
      if (isAuthenticated) {
        navigate("/checkout");
      } else {
        localStorage.setItem("redirectTo", "/checkout");
        navigate("/authen");
      }
    }
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
                <span className="ml-36 whitespace-nowrap text-lg font-semibold">
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
                        {truncateProductName(item.name, 20)}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="ml-36 text-lg">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <div className="col-span-1 ml-24 flex items-center">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="ml-2 text-lg text-blue-500 focus:outline-none"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="ml-2 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="ml-2 text-lg text-red-500 focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className="ml-28 text-lg">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-lg text-red-500 focus:outline-none"
                        aria-label="Remove item"
                      >
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
                aria-label="Discount code input"
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
                <span className="text-lg">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-lg">Phí Vận Chuyển</span>
                <span className="text-lg">{formatCurrency(SHIPPING_FEE)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-lg">Tạm Tính</span>
                <span className="text-lg">{formatCurrency(subtotal)}</span>
              </div>
              <button
                onClick={handleButtonClick}
                className="w-full rounded-md bg-blue-500 px-4 py-1 text-white"
              >
                {isAuthenticated ? "Mua Ngay" : "Đăng Nhập Để Mua Hàng"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {emptyCartMessage && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-md px-4 py-2 text-black">
          <div className="ml-24">
            <img src="src/assets/images/empty.jpg" alt="Empty" />
          </div>
          <p className="text-lg">{`${emptyCartMessage}`}</p>
          <p className="text-lg text-center">{`${countdown}s`}</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CartPage;
