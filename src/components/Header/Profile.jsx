import { Box, Menu, MenuItem, styled, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from "react"

const Component=styled(Menu)`
  margin-top:5px;
`
const Text=styled(Typography)`
  font-size:14px;
  margin-left:20px;
`
const Profile = ({account,setAccount}) => {
  const [open,setOpen]=useState(false);

  const handleClick=(event)=>{
    setOpen(event.currentTarget)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const logoutUser=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Optional
    localStorage.clear();
    alert('Logged out successfully!');
    setAccount('');
    window.location.reload();
  }
  return (
    <>
    <Box onClick={handleClick}><Typography style={{marginTop:2,paddingLeft:2, cursor:'pointer',textAlign:'center'}}> {account}</Typography></Box>
    <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><AccountCircleIcon/><Text>Profile</Text></MenuItem>
        <MenuItem onClick={handleClose}><HistoryIcon/><Text>Order History</Text></MenuItem>
        <MenuItem onClick={()=>{handleClose();logoutUser();}}><LogoutIcon/><Text>Logout</Text></MenuItem>
      </Component>
    </>
  )
}

export default Profile