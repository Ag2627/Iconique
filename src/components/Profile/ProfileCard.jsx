import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils'; // Utility function for conditional classNames
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ProfileCard = ({ user, handleDeleteUser, handleEditUser }) => {
  return (
    <Card className="max-w-lg mx-auto shadow-lg border rounded-lg overflow-hidden bg-gradient-to-r from-white via-gray-50 to-gray-100">
      {/* Profile Header with Icon */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 h-48 flex justify-center items-center">
      <AccountCircleIcon className="w-24 h-24 text-white bg-white bg-opacity-20 rounded-full border-4 border-white shadow-lg -mt-12" />

      </div>

      {/* User Details */}
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

        <div className="mt-4 space-y-2">
          <Label className="block text-gray-700 text-sm">
            <span className="font-semibold">Address:</span> {user?.address}
          </Label>
          <Label className="block text-gray-700 text-sm">
            <span className="font-semibold">Phone:</span> {user?.phone}
          </Label>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-4 flex justify-around bg-gray-50 border-t">
        <Button
          onClick={() => handleEditUser(user)}
          className={cn(
            "bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700",
            "focus:ring focus:ring-blue-300 focus:outline-none"
          )}
        >
          Edit
        </Button>
        <Button
          onClick={handleDeleteUser}
          className={cn(
            "bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600",
            "focus:ring focus:ring-red-300 focus:outline-none"
          )}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
