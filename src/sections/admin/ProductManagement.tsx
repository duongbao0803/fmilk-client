import React, { useState } from 'react';
import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';

const products = [
  { id: 1, image: 'image1.jpg', name: 'Product 1', quantity: 10, purchasePrice: 100, salePrice: 150, link: 'https://example.com/product1', status: 'Active' },
  { id: 2, image: 'image2.jpg', name: 'Product 2', quantity: 20, purchasePrice: 200, salePrice: 250, link: 'https://example.com/product2', status: 'Active' },
  { id: 3, image: 'image3.jpg', name: 'Product 3', quantity: 30, purchasePrice: 300, salePrice: 350, link: 'https://example.com/product3', status: 'Active' },
  { id: 4, image: 'image4.jpg', name: 'Product 4', quantity: 40, purchasePrice: 400, salePrice: 450, link: 'https://example.com/product4', status: 'Active' },
  { id: 5, image: 'image5.jpg', name: 'Product 5', quantity: 50, purchasePrice: 500, salePrice: 550, link: 'https://example.com/product5', status: 'Active' },
  { id: 6, image: 'image6.jpg', name: 'Product 6', quantity: 60, purchasePrice: 600, salePrice: 650, link: 'https://example.com/product6', status: 'Active' },
  { id: 7, image: 'image7.jpg', name: 'Product 7', quantity: 70, purchasePrice: 700, salePrice: 750, link: 'https://example.com/product7', status: 'Active' },
  { id: 8, image: 'image8.jpg', name: 'Product 8', quantity: 80, purchasePrice: 800, salePrice: 850, link: 'https://example.com/product8', status: 'Active' },
  { id: 9, image: 'image9.jpg', name: 'Product 9', quantity: 90, purchasePrice: 900, salePrice: 950, link: 'https://example.com/product9', status: 'Active' },
  { id: 10, image: 'image10.jpg', name: 'Product 10', quantity: 100, purchasePrice: 1000, salePrice: 1050, link: 'https://example.com/product10', status: 'Active' },
  { id: 11, image: 'image11.jpg', name: 'Product 11', quantity: 110, purchasePrice: 1100, salePrice: 1150, link: 'https://example.com/product11', status: 'Active' },
  { id: 12, image: 'image12.jpg', name: 'Product 12', quantity: 120, purchasePrice: 1200, salePrice: 1250, link: 'https://example.com/product12', status: 'Active' },
  { id: 13, image: 'image13.jpg', name: 'Product 13', quantity: 130, purchasePrice: 1300, salePrice: 1350, link: 'https://example.com/product13', status: 'Active' },
  { id: 14, image: 'image14.jpg', name: 'Product 14', quantity: 140, purchasePrice: 1400, salePrice: 1450, link: 'https://example.com/product14', status: 'Active' },
  { id: 15, image: 'image15.jpg', name: 'Product 15', quantity: 150, purchasePrice: 1500, salePrice: 1550, link: 'https://example.com/product15', status: 'Active' },
  { id: 16, image: 'image16.jpg', name: 'Product 16', quantity: 160, purchasePrice: 1600, salePrice: 1650, link: 'https://example.com/product16', status: 'Active' },
  { id: 17, image: 'image17.jpg', name: 'Product 17', quantity: 170, purchasePrice: 1700, salePrice: 1750, link: 'https://example.com/product17', status: 'Active' },
  { id: 18, image: 'image18.jpg', name: 'Product 18', quantity: 180, purchasePrice: 1800, salePrice: 1850, link: 'https://example.com/product18', status: 'Active' },
  { id: 19, image: 'image19.jpg', name: 'Product 19', quantity: 190, purchasePrice: 1900, salePrice: 1950, link: 'https://example.com/product19', status: 'Active' },
  { id: 20, image: 'image20.jpg', name: 'Product 20', quantity: 200, purchasePrice: 2000, salePrice: 2050, link: 'https://example.com/product20', status: 'Active' },
];

const ProductManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const itemsPerPage = 7;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = (productId: number) => {
    setDropdownVisible(dropdownVisible === productId ? null : productId);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="flex flex-col flex-grow ml-64">
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Product Management" />
        </div>

        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="flex mb-6 items-center">
                <div className="relative flex items-center mr-4 flex-grow">
                  <input type="text" placeholder="Product Name" className="border pl-10 p-2 rounded w-full" />
                </div>
                <select className="border p-2 rounded mr-4">
                  <option>Select Category</option>
                  <option>Tã</option>
                  <option>Sữa</option>
                  <option>Quần Áo</option>
                  <option>Ăn Dặm</option>
                </select>
                <select className="border p-2 rounded mr-4">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>In Active</option>
                </select>
                <button className="bg-black text-white p-2 rounded">Search</button>
                <button className="ml-auto bg-white text-black border p-2 rounded">Add Product</button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hình ảnh sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá Nhập
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá bán
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Link
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                        <img src={product.image} className="h-10 w-10 object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.purchasePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.salePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 text-center">
                        <a href={product.link} target="_blank" rel="noopener noreferrer">View</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center relative">
                        <button onClick={() => toggleDropdown(product.id)} className="focus:outline-none">
                          ...
                        </button>
                        {dropdownVisible === product.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              Product Details
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              Ngừng Kinh Doanh
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center">
                <button 
                  onClick={() => handleClick(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  className={`bg-gray-200 py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <button 
                  onClick={() => handleClick(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                  className={`bg-gray-200 py-2 px-4 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProductManagementPage;