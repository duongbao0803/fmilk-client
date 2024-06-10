import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';

const AdminAccountPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="flex-grow">
      <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Product Management" />
        </div>
        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto ml-52">
          <div className="max-w-4xl mx-auto bg-white rounded shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src="src/assets/images/logo/avatar_admin.jpg" alt="Admin Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-4" />
                <div>
                  <h1 className="text-xl font-bold mb-1">Bảo</h1>
                  <div className="text-gray-600">Gò Vấp, Hồ Chí Minh City, VN</div>
                  <div className="text-gray-600">Age: 22 | Gender: Male | Status: <span className="text-green-500">Active</span></div>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <strong>Role:</strong> <span className="ml-4">Admin</span>
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> <span className="ml-4">bao@gmail.com</span>
                </div>
                <div className="mb-4">
                  <strong>Contact:</strong> <span className="ml-4">(+84) (78910) (JQKA)</span>
                </div>
                <div className="mb-4">
                  <strong>Region:</strong> <span className="ml-4">Asia</span>
                </div>
              </div>
            </div>
            <div className="flex mt-6">
              <div className="w-1/2 bg-white p-4 rounded shadow mr-6">
                <h2 className="font-bold mb-4">Your Activities</h2>
                <div className="text-sm text-gray-600 mb-2">You added a role 'Event-Staff'</div>
                <div className="text-xs text-gray-500 mb-4">11/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">You assigned task 'Organizing a promotion program at Go Vap branch on February 12, 2024' to a role 'Staff-Event - Go Vap'</div>
                <div className="text-xs text-gray-500 mb-4">12/02/2024 09:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">You assigned task 'Check inventory at District 1 branch on February 19, 2024' to a role 'Warehouse-Staff - District 1'</div>
                <div className="text-xs text-gray-500 mb-4">19/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">You Fired sales staff at Go Vap branch February 19, 2024(reason: Lack of respect among customers)</div>
                <div className="text-xs text-gray-500 mb-4">19/02/2024 09:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">You revoke the Fox 2 Saler role February 19, 2024(reason: Lack of respect among customers)</div>
                <div className="text-xs text-gray-500 mb-4">19/02/2024 09:40:55 AM</div>
              </div>
              <div className="w-1/2 bg-white p-4 rounded shadow overflow-y-auto" style={{ maxHeight: '300px' }}>
                <h2 className="font-bold mb-4">Recent Activities</h2>
                <div className="text-sm text-gray-600 mb-2">Fox 1 added a role 'Staff' at Go Vap branch</div>
                <div className="text-xs text-gray-500 mb-4">11/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">Fox 1 assigned task to a role 'Event-Staff'</div>
                <div className="text-xs text-gray-500 mb-4">11/02/2024 10:40:55 AM</div>
                <div className="text-sm text-gray-600 mb-2">Fox 2 role 'Sales-Staff' has been canceled</div>
                <div className="text-xs text-gray-500 mb-4">19/02/2024 10:40:55 AM</div>
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

export default AdminAccountPage;
