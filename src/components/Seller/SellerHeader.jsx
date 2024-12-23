import { AlignJustify, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from 'react';
import { Button, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const [account, setAccount] = useState({ id: "", name: "" });

  // Retrieve account data from local storage on component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify className="lg:hidden sm:block" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end gap-2 items-center">
        <Typography variant="h6" >Hey {account?.name || 'Guest'}</Typography>
        <ProfileButton onClick={() => navigate('/seller/profile')}>Profile</ProfileButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
    </header>
  );
};

export default SellerHeader;
