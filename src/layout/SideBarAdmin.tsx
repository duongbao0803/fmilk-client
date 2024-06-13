import React from 'react';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
  return (
    <aside className="w-64 bg-pink-600 text-white">
      <div className="p-4 text-2xl font-bold">FPT</div>
      <nav className="mt-6">
        <Link to={'/admindashboard'}>
          <span className="block p-4 hover:bg-pink-500">Dashboard</span>
        </Link>
        <Link to={'/adminorder'}>
          <span className="block p-4 hover:bg-pink-500">Order Management</span>
        </Link>
        <Link to={'/adminproduct'}>
          <span className="block p-4 hover:bg-pink-500">Product Management</span>
        </Link>
        <Link to={'/adminstaff'}>
          <span className="block p-4 hover:bg-pink-500">Staff Management</span>
        </Link>
        <Link to={'/adminaccount'}>
          <span className="block p-4 hover:bg-pink-500">Account</span>
        </Link>
      </nav>
    </aside>
  );
}

export { SideBar };
