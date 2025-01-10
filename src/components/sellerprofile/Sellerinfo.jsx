import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { deleteSeller ,fetchSeller, editSeller } from '@/redux/store/sellerprofile';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import sellerprofilecard from './Sellerprofilecard';

//import { ProfileFormControls } from '../../config/index';

const initialSellerFormData = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

const Sellerinfo = () => {
  const [formData, setFormData] = useState(initialSellerFormData);
  const [isEditing, setIsEditing] = useState(false); // Controls form visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { toast } = useToast();

  if (!token) {
    return <Navigate to="/" />;
  }

  const { SellerList } = useSelector((state) => state.sellerprofile);
  const userId = jwtDecode(token)?.id;
  console.log("hello ji",SellerList)
  const handleManageUser = (event) => {
    event.preventDefault();
    dispatch(editSeller({ id: sellerId, formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchUser(sellerId));
        setIsEditing(false);
        setFormData(initialSellerFormData);
        toast({
          title: 'Profile Updated',
          message: 'Profile has been updated successfully',
          type: 'success',
        });
      }
    });
  };

  const handleEditSeller = (seller) => {
    setFormData(seller);
    setIsEditing(true); // Show the form
  };

  const handleDeleteSeller = () => {
    dispatch(deleteSeller(sellerId)).then((data) => {
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
    dispatch(fetchSeller(sellerId));
  }, [dispatch, sellerId]);

  //const seller = SellerList; // Assuming only one user is fetched

  return (
    <Card>
      {!isEditing ? (
        <div className="p-4">
          {user ? (
            <Sellerprofilecard
              seller={seller}
              handleEditSeller={handleEditSeller}
              handleDeleteSeller={handleDeleteSeller}
            />
          ) : (
            <p>No seller details available.</p>
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

export default Sellerinfo;


