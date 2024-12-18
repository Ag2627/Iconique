import { AlignJustify, LogOut } from "lucide-react";
import React, { useContext } from 'react';
import { Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/context/DataProvider";

const LogoutButton = styled(Button)`
  background: #A52448;
  text-transform: none;
  padding: 8px 30px;
  color: white;
  border-radius: 5px;
  box-shadow: none;
  font-weight: 600;
  margin-left: 10px;
  height: 40px;
`;

const ProfileButton = styled(Button)`
  background: #1976D2;
  text-transform: none;
  padding: 8px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: none;
  font-weight: 600;
  margin-left: 10px;
  height: 40px;
`;

const EditProfileButton = styled(Button)`
  background: #FFA726;
  text-transform: none;
  padding: 8px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: none;
  font-weight: 600;
  margin-left: 10px;
  height: 40px;
`;

const SellerHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    alert('Logged out successfully!');
    setAccount('');
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify className="lg:hidden sm:block" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end gap-2 items-center">
        <ProfileButton onClick={() => navigate('profile')}>Profile</ProfileButton>
        <EditProfileButton onClick={() => navigate('edit-profile')}>Edit Profile</EditProfileButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
    </header>
  );
};

export default SellerHeader;
