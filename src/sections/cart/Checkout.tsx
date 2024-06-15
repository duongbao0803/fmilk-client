import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface FormValues {
  email: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
}

interface CartItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    email: "",
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    street: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const SHIPPING_FEE = 30;

  const truncateProductName = (name: string, length: number) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectTo', '/checkout');
      navigate('/authen');
      return;
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", form);
    navigate("/payment", { state: { form, cart, totalPrice, subtotal } });
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
          <div className="w-2/5 rounded-md border border-gray-300 p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-2xl text-blue-800">
                Địa Chỉ Giao Hàng
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  id="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name">Họ và Tên*:</label>
                <br />
                <input
                  id="name"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone">Số điện thoại*:</label>
                <br />
                <input
                  id="phone"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city">Tỉnh/Thành Phố*:</label>
                <br />
                <input
                  id="city"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="district">Quận/Huyện*:</label>
                <br />
                <input
                  id="district"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="ward">Phường/Xã*:</label>
                <br />
                <input
                  id="ward"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="text"
                  name="ward"
                  value={form.ward}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="street">Số nhà, Tên đường*:</label>
                <br />
                <input
                  id="street"
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                type="submit"
              >
                Tiếp Tục
              </button>
            </form>
          </div>
          <div className="ml-20 w-2/3">
            <div className="mb-8 rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Giỏ Hàng</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <span className="text-lg font-semibold">Sản Phẩm</span>
                </div>
                <div className="col-span-1">
                  <span className="text-lg font-semibold ml-20 whitespace-nowrap">Đơn Giá</span>
                </div>
                <div className="col-span-1">
                  <span className="ml-4 whitespace-nowrap text-lg font-semibold">
                    Số Lượng
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="ml-4 whitespace-nowrap text-lg font-semibold">
                    Thành Tiền
                  </span>
                </div>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <React.Fragment key={item._id}>
                      <div className="col-span-1 flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-2" />
                        <span className="whitespace-nowrap text-lg">
                        {truncateProductName(item.name, 20)}
                      </span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <span className="text-sm ml-24">${item.price}</span>
                      </div>
                      <div className="col-span-1 ml-4 flex items-center">
                        <span className="ml-10 text-sm">{item.quantity}</span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <span className="ml-10 text-sm">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="col-span-4">
                    <p className="text-sm">Giỏ Hàng Của Bạn Trống.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
