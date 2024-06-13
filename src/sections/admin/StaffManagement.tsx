import React, { useState } from 'react';
import { Header } from '../../layout/HeaderAdmin';
import { SideBar } from '../../layout/SideBarAdmin';
import { Footer } from '../../layout/FooterAdmin';

const StaffManagementPage: React.FC = () => {
  const staffMembers = [
    { id: 1, name: 'Fox 1', role: 'Sales-Staff', staffId: 'SS-HCM-GV-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 2, name: 'Fox 2', role: 'Sales-Staff', staffId: 'SS-HCM-D1-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 3, name: 'Fox 3', role: 'Sales-Staff', staffId: 'SS-HCM-D12-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 4, name: 'Fox 4', role: 'Sales-Staff', staffId: 'SS-HCM-GV-0002', joinDate: '2/4/2023', gender: 'Male' },
    { id: 5, name: 'Fox 5', role: 'Sales-Staff', staffId: 'SS-HCM-D7-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 6, name: 'Fox 6', role: 'Event-Staff', staffId: 'ES-HCM-GV-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 7, name: 'Fox 7', role: 'Event-Staff', staffId: 'ES-HCM-D1-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 8, name: 'Fox 8', role: 'Event-Staff', staffId: 'ES-HCM-D12-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 9, name: 'Fox 9', role: 'Event-Staff', staffId: 'ES-HCM-D7-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 10, name: 'Fox 10', role: 'Event-Staff', staffId: 'ES-HCM-GV-0002', joinDate: '2/4/2023', gender: 'Male' },
    { id: 11, name: 'Fox 11', role: 'Event-Staff', staffId: 'ES-HCM-D1-0002', joinDate: '2/4/2023', gender: 'Male' },
    { id: 12, name: 'Fox 12', role: 'Storage-Staff', staffId: 'StS-HCMM-GV-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 13, name: 'Fox 13', role: 'Storage-Staff', staffId: 'StS-HCMM-D1-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 14, name: 'Fox 14', role: 'Storage-Staff', staffId: 'StS-HCMM-D12-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 15, name: 'Fox 15', role: 'Storage-Staff', staffId: 'StS-HCMM-D7-0001', joinDate: '2/4/2023', gender: 'Male' },
    { id: 16, name: 'Fox 16', role: 'Storage-Staff', staffId: 'StS-HCMM-GV-0002', joinDate: '2/4/2023', gender: 'Male' },
    { id: 17, name: 'Fox 17', role: 'Storage-Staff', staffId: 'StS-HCMM-D1-0002', joinDate: '2/4/2023', gender: 'Male' },
    { id: 18, name: 'Fox 18', role: 'Event-Staff', staffId: 'ES-HCM-D7-0002', joinDate: '2/4/2023', gender: 'Male' },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = staffMembers.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(staffMembers.length / itemsPerPage);

  const totalStaff = staffMembers.length;
  const newStaff = staffMembers.filter(member => new Date(member.joinDate) > new Date('1/1/2023')).length;
  const maleStaff = staffMembers.filter(member => member.gender === 'Male').length;
  const femaleStaff = staffMembers.filter(member => member.gender === 'Female').length;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-64 bg-pink-600 text-white">
        <SideBar />
      </div>
      <div className="flex-grow ml-64">
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <Header title="Staff Management" />
        </div>
        <main className="flex-grow p-6 mt-16 mb-16 bg-gray-100 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-200 p-4 rounded">
              <p>Total Staff</p>
              <h3>{totalStaff}</h3>
            </div>
            <div className="bg-yellow-200 p-4 rounded">
              <p>New Staff</p>
              <h3>{newStaff}</h3>
            </div>
            <div className="bg-blue-200 p-4 rounded">
              <p>Male</p>
              <h3>{maleStaff}</h3>
            </div>
            <div className="bg-green-200 p-4 rounded">
              <p>Female</p>
              <h3>{femaleStaff}</h3>
            </div>
          </div>

          <div className="flex mb-6">
            <input type="text" placeholder="Staff Name" className="border p-2 rounded mr-4 flex-grow" />
            <select className="border p-2 rounded mr-4">
              <option>Select Status</option>
              {/* Add more options as needed */}
            </select>
            <select className="border p-2 rounded mr-4">
              <option>Select Priority</option>
              {/* Add more options as needed */}
            </select>
            <button className="bg-black text-white p-2 rounded">Search</button>
            <button className="ml-auto bg-white text-black border p-2 rounded">Add Staff</button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {currentStaff.map(staff => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>

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
        </main>
        <div className="fixed bottom-0 left-64 right-0 bg-white shadow-md z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

const StaffCard: React.FC<{ staff: any }> = ({ staff }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-center">
      <img src="https://via.placeholder.com/100" alt="avatar" className="rounded-full w-24 h-24 mb-4" />
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">{staff.name}</h4>
        <p className="text-gray-600 mb-4">{staff.role}</p>
        <p className="text-gray-600 mb-1">Staff ID: {staff.staffId}</p>
        <p className="text-gray-600 mb-4">Join Date: {staff.joinDate}</p>
      </div>
      <div className="flex justify-center mt-auto">
        <button className="text-blue-500 mx-2">Call</button>
        <button className="text-blue-500 mx-2">Message</button>
        <button className="text-blue-500 mx-2">Email</button>
      </div>
    </div>
  );
}

export default StaffManagementPage;
