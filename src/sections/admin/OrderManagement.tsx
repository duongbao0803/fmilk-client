import React from 'react';
import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';

interface Order {
  order: string;
  customer: string;
  status: string;
  quantity: number;
  location: string;
  date: string;
  total: string;
}

const ordersData: Order[] = [
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Not started',
    quantity: 45,
    location: 'Thanh Hóa',
    date: '12 Feb 2024',
    total: '$56.99'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Fulfilled',
    quantity: 56,
    location: 'Nghệ An',
    date: '13 Feb 2024',
    total: '$167.99'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Ready for ship',
    quantity: 123,
    location: 'Hà Tỉnh',
    date: '14 Feb 2024',
    total: '$747.99'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Not Started',
    quantity: 35,
    location: 'Hò Chí Minh',
    date: '15 Feb 2024',
    total: '$34.76'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Shipped',
    quantity: 38,
    location: 'Hà Nội',
    date: '16 Feb 2024',
    total: '$345.45'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Pending',
    quantity: 10,
    location: 'Hải Phòng',
    date: '17 Feb 2024',
    total: '$34.00'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Ready for ship',
    quantity: 36,
    location: 'Quảng Ninh',
    date: '18 Feb 2024',
    total: '$134.00'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Fulfilled',
    quantity: 18,
    location: 'Ninh Thuận',
    date: '19 Feb 2024',
    total: '$234.76'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Pending',
    quantity: 18,
    location: 'Bến Tre',
    date: '23 Feb 2024',
    total: '$234.76'
  },
  {
    order: '#46647',
    customer: 'Fox 1',
    status: 'Not Started',
    quantity: 18,
    location: 'Củ Chi',
    date: '23 Feb 2024',
    total: '$234.76'
  }
];

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Not started':
      return 'text-gray-500';
    case 'Fulfilled':
      return 'text-green-500';
    case 'Ready for ship':
      return 'text-blue-500';
    case 'Shipped':
      return 'text-green-500';
    case 'Pending':
      return 'text-yellow-500';
    default:
      return '';
  }
};

const OrdersPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="flex-grow">
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Orders" />
        </div>
        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto ml-64">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CUSTOMER</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">QUANTITY</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersData.map((order, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.order}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.customer}</td>
                    <td className={`py-4 px-4 text-center whitespace-nowrap ${getStatusClass(order.status)}`}>{order.status}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.quantity}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.location}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.date}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{order.total}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-gray-200 py-2 px-4 rounded">Previous</button>
            <button className="bg-gray-200 py-2 px-4 rounded">Next</button>
          </div>
        </main>
        <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
