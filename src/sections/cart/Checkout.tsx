import Header from '@/layout/Header';
import React, { useState } from 'react';

interface FormValues {
  email: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', form);
  };

  return (
    <div>
    <Header/>
    <div className="w-2/5 mx-auto p-6 border rounded-md border-gray-300 float-left ml-20">
    <form onSubmit={handleSubmit}>
        <div className='text-blue-800 text-2xl'>Địa Chỉ Giao Hàng</div>
      <div className="mb-4">
          <label>Email:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Họ và Tên*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Số điện thoại*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Tỉnh/Thành Phố*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="text" name="city" value={form.city} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Quận/Huyện*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="text" name="district" value={form.district} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Phường/Xã*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="text" name="ward" value={form.ward} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label>Số nhà, Tên đường*:</label>
          <br />
          <input className="w-full py-1 px-3 rounded-md border border-gray-300" type="text" name="street" value={form.street} onChange={handleChange} required />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Tiếp Tục</button>
      </form>
    </div>
    </div>
  );
};

export default Checkout;
