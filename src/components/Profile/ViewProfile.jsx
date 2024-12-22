import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import ManageAddresses from './ManageAddresses';
import MyOrders from './MyOrders';

const ViewProfile = () => {
  return (
    <div className="flex mt-6 pt-5 min-h-screen bg-gray-100">
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Account Settings</h2>
        <nav className="space-y-2">
          <NavLink
            to="personal-info"
            className={({ isActive }) =>
              isActive
                ? 'block px-4 py-2 text-white bg-blue-500 rounded'
                : 'block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded'
            }
          >
            Personal Info
          </NavLink>
          <NavLink
            to="manage-addresses"
            className={({ isActive }) =>
              isActive
                ? 'block px-4 py-2 text-white bg-blue-500 rounded'
                : 'block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded'
            }
          >
            Manage Addresses
          </NavLink>
          <NavLink
            to="manage-orders"
            className={({ isActive }) =>
              isActive
                ? 'block px-4 py-2 text-white bg-blue-500 rounded'
                : 'block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded'
            }
          >
            Orders
          </NavLink>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <Routes>
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="manage-addresses" element={<ManageAddresses />} />
          <Route path="manage-orders" element={<MyOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default ViewProfile;
