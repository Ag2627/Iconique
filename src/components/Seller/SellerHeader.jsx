import { AlignJustify, LogOut } from "lucide-react";
import React from 'react'
import { Button, styled } from "@mui/material";


const LogoutButton=styled(Button)`
  background:#A52448;
  text-transform:none;
  padding: 5px 40px;
  color:white;
  border-radius:5px;
  box-shadow:none;
  font-weight:600;
  margin-left:10px;
  height:32px;
`
const ProfileButton = styled(Button)`
  background: #1976D2; // Example color
  text-transform: none;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: none;
  font-weight: 600;
  margin-left: 10px;
  height: 32px;
`;

const EditProfileButton = styled(Button)`
  background: #FFA726;
  text-transform: none;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: none;
  font-weight: 600;
  margin-left: 10px;
  height: 32px;
`;

const SellerHeader = ({setOpen}) => {
  
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      {/* //from lucid react */}
      <AlignJustify className="lg:hidden sm:block"/>
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">

    <ProfileButton
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          Profile
        </ProfileButton>
        
        <EditProfileButton
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          Edit Profile
        </EditProfileButton>

      <LogoutButton
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
      >
        {/*From lucid react */}
        Logout
      </LogoutButton>
    </div>
  </header>
);

}

export default SellerHeader