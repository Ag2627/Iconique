import { Box, Button,Menu, MenuItem, styled, Typography,Badge} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginDialog from "../login/LoginDialog";
import { useState,useEffect } from "react";
import Profile from "./Profile";
import SellerLogin from "../login/SellerLogin";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// const Wrapper=styled(Box)(({theme})=>({
//   display:'flex',
//   margin: '0 3% 0 auto',
//   '& > button,& > p,& > div':{
//     marginRight:'40px',
//     fontSize:'16px',
//     alignItems:'center',
//     [theme.breakpoints.down('lg')]:{
//       display:'none'
//     }
// }}))
const Wrapper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
      marginRight: '40px !important',
      textDecoration: 'none',
      color: '#FFFFFF',
      fontSize: 16,
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
          color: '#F33A6A',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 10
      }
  },
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  }
}));
// const Wrapper=styled(Box)({
//   display:'flex',
//   margin: '0 3% 0 auto',
//   '& > button,& > p,& > div':{
//     marginRight:'40px',
//     fontSize:'16px',
//     alignItems:'center',
    
// }})

const Text=styled(Typography)`
  font-size:14px;
`
const Component=styled(Menu)`
  margin-top:5px;
`
const Container=styled(Link)`
  display:flex;
`
const LoginButton=styled(Button)`
  background:#A52448;
  margin-top:10px;
  margin-left:10px;
  text-transform:none;
  padding: 5px 40px;
  border-radius:5px;
  box-shadow:none;
  font-weight:600;
  height:32px;
`
const CustomButton = () => {

  const [open,setOpen]=useState(false);
  const [sellerOpen,setSellerOpen]=useState(false);
  const [account, setAccount] = useState({ id: "", name: "" });
  const [openMenu,setMenu]=useState(false);

  // Retrieve account data from local storage on component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);
  const handleClick=(event)=>{
    setMenu(event.currentTarget)
  }
  const handleClose=()=>{
    setMenu(false)
  }

  const openDialog=()=>{
    setOpen(true);
    }
  const openSellerDialog=()=>{
    setSellerOpen(true);
  }
  const {cartItems} = useSelector(state => state.shopCart);
  // console.log("Checking account",account);
    return (
    <Wrapper>
      {
        account.id? <Profile account={account} setAccount={setAccount}/>:
        <LoginButton variant="contained" onClick={()=>openDialog()} >Login</LoginButton>
      }
        
        <Typography style={{marginTop: 5,width:135,alignSelf:'center' }} onClick={()=>openSellerDialog()}>Become a Seller</Typography>
        
        <Container to = "/cart">
          <Badge badgecontent ={cartItems ?. length} color="secondary">
            <ShoppingCartIcon/>
          </Badge>
            <Typography style={{marginLeft : 10}}>Cart</Typography>
        </Container>
        <Container component={Link} to="/wishlist">
            <FavoriteIcon/>
            <Typography>Wishlist</Typography>
        </Container>
        <LoginDialog open={open} setOpen={setOpen}/>
        <SellerLogin open={sellerOpen} setOpen={setSellerOpen}/>
        {/* Three dots icon */}
        <MoreVertIcon onClick={handleClick} style={{alignSelf:'center'}}/>
        <Component
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/about" onClick={handleClose}><Text>About us</Text></MenuItem>
        <MenuItem component={Link} to="/contact" onClick={handleClose}><Text>Contact us</Text></MenuItem>
      </Component>

    </Wrapper>
  )
}

export default CustomButton