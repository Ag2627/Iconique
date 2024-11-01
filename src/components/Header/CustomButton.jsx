import { Box, Button,Menu, MenuItem, styled, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginDialog from "../login/LoginDialog";
import { useState,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";

const Wrapper=styled(Box)`
  display:flex;
  margin: 0 3% 0 auto;
  & > button,& > p,& > div{
    margin-right:40px;
    font-size:16px;
    align-items:center;
  }

`
const Text=styled(Typography)`
  font-size:14px;
`
const Component=styled(Menu)`
  margin-top:5px;
`
const Container=styled(Box)`
  display:flex;
`
const LoginButton=styled(Button)`
  background:#A52448;
  text-transform:none;
  padding: 5px 40px;
  border-radius:5px;
  box-shadow:none;
  font-weight:600;
  margin-left:10px;
  height:32px;
`
const CustomButton = () => {

  const [open,setOpen]=useState(false);
  const {account,setAccount}=useContext(DataContext);

  const [openMenu,setMenu]=useState(false);

  const handleClick=(event)=>{
    setMenu(event.currentTarget)
  }
  const handleClose=()=>{
    setMenu(false)
  }

  const openDialog=()=>{
    setOpen(true);
    }
    return (
    <Wrapper>
      {
        account? <Profile account={account} setAccount={setAccount}/>:
        <LoginButton variant="contained" onClick={()=>openDialog()} >Login</LoginButton>
      }
        
        <Typography style={{marginTop: 5,width:135,alignSelf:'center' }}>Become a Seller</Typography>
        <Typography style={{marginTop: 5,alignSelf:'center'}}>More</Typography>
        <Container>
            <ShoppingCartIcon/>
            <Typography>Cart</Typography>
        </Container>
        <Container>
            <FavoriteIcon/>
            <Typography>Wishlist</Typography>
        </Container>
        <LoginDialog open={open} setOpen={setOpen}/>
        <MoreVertIcon onClick={handleClick} style={{alignSelf:'center'}}/>
        <Component
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Text>About us</Text></MenuItem>
        <MenuItem onClick={handleClose}><Text>Contact us</Text></MenuItem>
      </Component>

    </Wrapper>
  )
}

export default CustomButton