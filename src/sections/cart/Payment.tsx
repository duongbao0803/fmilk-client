import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CartItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
}

const Payment: React.FC = () => {
  const location = useLocation();
  const { form, cart, totalPrice, subtotal } = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const truncateProductName = (name: string, length: number) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  const SHIPPING_FEE = 30;

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
    setError('');
  };

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShipping(event.target.value);
    setError('');
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      setError('Bạn chưa chọn phương thức thanh toán');
      return;
    }
    if (!selectedShipping) {
      setError('Bạn chưa chọn phương thức vận chuyển');
      return;
    }
    console.log('Order placed:', { form, cart, selectedPayment, selectedShipping });
    navigate('/order-success');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-center gap-4">
          <div className="w-2/5">
            <h2 className='text-3xl text-blue-800 mb-4'>Thông Tin Đặt Hàng</h2>
            <div className="mb-8">
              <p><strong>Người đặt hàng:</strong> {form?.name}, {form?.email}, {form?.phone}</p>
              <p><strong>Địa chỉ:</strong> {`${form?.street}, ${form?.ward}, ${form?.district}, ${form?.city}`}</p>
            </div>

            <h2 className='text-3xl text-blue-800 mb-4'>Phương thức vận chuyển</h2>
            <div className="flex items-center mb-8">
              <input type="radio" id="giaohangtietkiem" name="shipping" value="Giao Hàng Tiết Kiệm" onChange={handleShippingChange} />
              <img src="src/assets/images/logo/avatar_staff.jpg" alt="Giao Hàng Tiết Kiệm" className="w-5 mr-2" />
              <label htmlFor="giaohangtietkiem" className='text-xl'>Giao Hàng Tiết Kiệm</label>
            </div>
            <div className="flex items-center mb-8">
              <input type="radio" id="tikinow" name="shipping" value="Tiki Now" onChange={handleShippingChange} />
              <img src="src/assets/images/logo/avatar_admin.jpg" alt="Tiki Now" className="w-5 mr-2" />
              <label htmlFor="tikinow" className='text-xl'>Tiki Now</label>
            </div>
            <div className="flex items-center mb-8">
              <input type="radio" id="grabdelivery" name="shipping" value="Grab Delivery" onChange={handleShippingChange} />
              <img src="src/assets/images/logo/avatar_staff.jpg" alt="Grab Delivery" className="w-5 mr-2" />
              <label htmlFor="grabdelivery" className='text-xl'>Grab Delivery</label>
            </div>
            <div className="flex items-center mb-8">
              <input type="radio" id="shopeedelivery" name="shipping" value="Shopee Delivery" onChange={handleShippingChange} />
              <img src="src/assets/images/logo/avatar_admin.jpg" alt="Shopee Delivery" className="w-5 mr-2" />
              <label htmlFor="shopeedelivery" className='text-xl'>Shopee Delivery</label>
            </div>

            <h2 className='text-3xl text-blue-800 mb-4'>Phương thức thanh toán</h2>
            <div className="flex items-center mb-8">
              <input 
                type="radio" 
                id="cod" 
                name="payment" 
                value="COD" 
                onChange={handlePaymentChange} 
              />
              <img src="src/assets/images/logo/avatar_user.jpg" alt="COD" className="w-5 mr-2" />
              <label htmlFor="cod" className='text-xl'>COD</label>
            </div>
            <div className="flex items-center mb-8">
              <input 
                type="radio" 
                id="chuyenkhoan" 
                name="payment" 
                value="Chuyển Khoản" 
                onChange={handlePaymentChange} 
              />
              <img src="src/assets/images/logo/avatar_user.jpg" alt="Chuyển Khoản" className="w-5 mr-2" />
              <label htmlFor="chuyenkhoan" className='text-xl'>Chuyển Khoản</label>
            </div>

            {selectedPayment === 'Chuyển Khoản' && (
              <div>
                <img src="src/assets/images/transfer/aaa.jpg" alt="Chuyển Khoản" />
              </div>
            )}
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
                  cart.map((item: CartItem) => (
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
              {error && (
                <div className="text-red-500 text-center mt-4">
                  {error}
                </div>
              )}
           </div>
           <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handlePlaceOrder}
                >
                  Đặt Hàng
                </button>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
