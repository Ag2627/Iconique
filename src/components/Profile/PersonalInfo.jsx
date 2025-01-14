import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { deleteUser, editUser, fetchUser } from '@/redux/store/profile';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ProfileCard from './ProfileCard';
import CommonForm from '../common/form';
import { ProfileFormControls } from '../../config/index';

const initialUserFormData = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

const PersonalInfo = () => {
  const [formData, setFormData] = useState(initialUserFormData);
  const [isEditing, setIsEditing] = useState(false); // Controls form visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { toast } = useToast();

  if (!token) {
    return <Navigate to="/" />;
  }

  const { UserList } = useSelector((state) => state.profile);
  const userId = jwtDecode(token)?.id;
  const handleManageUser = (event) => {
    event.preventDefault();
    dispatch(editUser({ id: userId, formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchUser(userId));
        setIsEditing(false);
        setFormData(initialUserFormData);
        toast({
          title: 'Profile Updated',
          message: 'Profile has been updated successfully',
          type: 'success',
        });
      }
    });
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setIsEditing(true); // Show the form
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(userId)).then((data) => {
      if (data?.payload?.success) {
        localStorage.removeItem('token'); // Clear token
        navigate('/'); // Redirect to login page
        toast({
          title: 'Account Deleted',
          description: 'Your account has been deleted successfully',
          type: 'success',
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const user = UserList; // Assuming only one user is fetched

  return (
    <Card>
      {!isEditing ? (
        <div className="p-4">
          {user ? (
            <ProfileCard
              user={user}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          ) : (
            <p>No user details available.</p>
          )}
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CommonForm
              formControls={ProfileFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText="Save Changes"
              onSubmit={handleManageUser}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PersonalInfo;
