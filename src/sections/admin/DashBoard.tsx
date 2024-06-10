import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';
const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/*Side Bar*/}
      <SideBar />
      <div className="flex flex-col flex-grow">
      <Header title="Dash Board"/>
      {/* Main Content */}
      

        <main className="flex-grow p-6 bg-gray-100">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <div className="text-2xl font-bold">54</div>
              <div className="text-gray-500">Staff</div>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <div className="text-2xl font-bold">79</div>
              <div className="text-gray-500">Products</div>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <div className="text-2xl font-bold">124</div>
              <div className="text-gray-500">Orders</div>
            </div>
            <div className="p-4 bg-pink-600 text-white shadow-md rounded-lg">
              <div className="text-2xl font-bold">$239k</div>
              <div className="text-gray-200">Income</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Orders</h2>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg">See all</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Customers Name</th>
                    <th className="text-left">Store</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vũ Minh Quân</td>
                    <td>Quận FE</td>
                    <td><span className="text-green-600">Active</span></td>
                  </tr>
                  <tr>
                    <td>Lê Ngọc Phú</td>
                    <td>Quận FE</td>
                    <td><span className="text-orange-600">In Progress</span></td>
                  </tr>
                  <tr>
                    <td>Lê Bá Trung</td>
                    <td>Quận BE</td>
                    <td><span className="text-red-600">InActive</span></td>
                  </tr>
                  <tr>
                    <td>Đặng Hữu Phúc</td>
                    <td>Quận Full-Stack</td>
                    <td><span className="text-green-600">Active</span></td>
                  </tr>
                  <tr>
                    <td>Nguyễn Hoàng Nam</td>
                    <td>Quận BE</td>
                    <td><span className="text-green-600">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Staff</h2>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg">See all</button>
              </div>
              <ul>
                <li className="flex items-center mb-4">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                  <div className="ml-4">
                    <div className="font-bold">Đặng Hữu Phúc</div>
                    <div className="text-gray-500">Full-Stack</div>
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                  <div className="ml-4">
                    <div className="font-bold">Vũ Minh Quân</div>
                    <div className="text-gray-500">FE</div>
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                  <div className="ml-4">
                    <div className="font-bold">Lê Ngọc Phú</div>
                    <div className="text-gray-500">FE</div>
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                  <div className="ml-4">
                    <div className="font-bold">Lê Bá Trung</div>
                    <div className="text-gray-500">BE</div>
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full"/>
                  <div className="ml-4">
                    <div className="font-bold">Nguyễn Hoàng Nam</div>
                    <div className="text-gray-500">BE</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardPage;
