import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Payment: React.FC = () => {
  const location = useLocation();
  const { form, cart, totalPrice, subtotal } = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <div className="container mx-auto px-8 py-4">
      <h2 className='text-3xl text-blue-800 mb-4'>Thông Tin Đặt Hàng</h2>
      <div className="mb-8">
        <p><strong>Người đặt hàng:</strong> {form?.name}, {form?.email}, {form?.phone}</p>
        <p><strong>Địa chỉ:</strong> {`${form?.street}, ${form?.ward}, ${form?.district}, ${form?.city}`}</p>
      </div>

      <h2 className='text-3xl text-blue-800 mb-4'>Phương thức vận chuyển</h2>
      <div className="flex items-center mb-8">
        <input type="radio" id="giaohangtietkiem" name="shipping" value="Giao Hàng Tiết Kiệm" />
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/cod-payment.png" alt="Giao Hàng Tiết Kiệm" className="w-5 mr-2" />
        <label htmlFor="giaohangtietkiem" className='text-xl'>Giao Hàng Tiết Kiệm</label>
      </div>
      <div className="flex items-center mb-8">
        <input type="radio" id="tikinow" name="shipping" value="Tiki Now" />
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/cod-payment.png" alt="Tiki Now" className="w-5 mr-2" />
        <label htmlFor="tikinow" className='text-xl'>Tiki Now</label>
      </div>
      <div className="flex items-center mb-8">
        <input type="radio" id="grabdelivery" name="shipping" value="Grab Delivery" />
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/cod-payment.png" alt="Grab Delivery" className="w-5 mr-2" />
        <label htmlFor="grabdelivery" className='text-xl'>Grab Delivery</label>
      </div>
      <div className="flex items-center mb-8">
        <input type="radio" id="shopeedelivery" name="shipping" value="Shopee Delivery" />
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/cod-payment.png" alt="Shopee Delivery" className="w-5 mr-2" />
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
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/credit-payment.png" alt="COD" className="w-5 mr-2" />
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
        <img src="https://cdn.kidsplaza.io/assets/icons/payment/credit-payment.png" alt="Chuyển Khoản" className="w-5 mr-2" />
        <label htmlFor="chuyenkhoan" className='text-xl'>Chuyển Khoản</label>
      </div>

      {selectedPayment === 'Chuyển Khoản' && (
        <div>
          <img src="src/assets/images/transfer/aaa.jpg" alt="Chuyển Khoản" />
        </div>
      )}
      
      <h2 className='text-3xl text-blue-800 mb-4'>Thông Tin Đơn Hàng</h2>
      <div className="flex justify-between mb-2">
        <span className="text-lg">Tổng Giá Sản Phẩm</span>
        <span className="text-lg">${totalPrice?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-lg">Phí Vận Chuyển</span>
        <span className="text-lg">$30.00</span>
      </div>
      <div className="flex justify-between font-semibold mb-8">
        <span className="text-lg">Tạm Tính</span>
        <span className="text-lg">${subtotal?.toFixed(2)}</span>
      </div>

      <h2 className='text-3xl text-blue-800 mb-4'>Giỏ Hàng</h2>
      {cart?.map((item: any) => (
        <div key={item._id} className="mb-4">
          <p><strong>{item.name}</strong></p>
          <p>Số lượng: {item.quantity}</p>
          <p>Giá: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Payment;
