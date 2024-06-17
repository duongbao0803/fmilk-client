import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';

interface Product {
  _id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
  link: string;
}

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>('https://fmilk-server.onrender.com/api/v1/product/');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
                      Giá bán
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
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                        <img src={product.image} className="h-10 w-10 object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 text-center">
                        <a href={product.link} target="_blank" rel="noopener noreferrer">View</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center relative">
                        <button onClick={() => toggleDropdown(product._id)} className="focus:outline-none">
                          ...
                        </button>
                        {dropdownVisible === product._id && (
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
