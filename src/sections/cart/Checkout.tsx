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
    email: '',
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: ''
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
    navigate('/payment', { state: { form, cart, totalPrice, subtotal } });
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
          <div className="w-2/5 p-6 border rounded-md border-gray-300">
            <form onSubmit={handleSubmit}>
              <div className="text-blue-800 text-2xl mb-6">Địa Chỉ Giao Hàng</div>
              <div className="mb-4">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  id="email"
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
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
                  className="w-full py-1 px-3 rounded-md border border-gray-300"
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Tiếp Tục
              </button>
            </form>
          </div>
          <div className="w-2/3 ml-20">
            <div className="bg-white shadow-md rounded-lg p-4 mb-8">
              <h2 className="text-lg font-semibold mb-4">Giỏ Hàng</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <span className="text-lg font-semibold">Sản Phẩm</span>
                </div>
                <div className="col-span-1">
                  <span className="text-lg font-semibold ml-20 whitespace-nowrap">Đơn Giá</span>
                </div>
                <div className="col-span-1">
                  <span className="text-lg font-semibold ml-4 whitespace-nowrap">Số Lượng</span>
                </div>
                <div className="col-span-1">
                  <span className="text-lg font-semibold ml-4 whitespace-nowrap">Thành Tiền</span>
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
                      <div className="col-span-1 flex items-center ml-4">
                        <span className="text-sm ml-10">{item.quantity}</span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <span className="text-sm ml-10">${item.price * item.quantity}</span>
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
            <div className="bg-white shadow-md rounded-lg p-4">
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
          </div>
        </div>
      </div>
    </div>
  <Footer />
</>
  );
};

export default Checkout;
