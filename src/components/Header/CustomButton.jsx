import { Box, Button, styled, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Wrapper=styled(Box)`
  display:flex;
  margin: 0 3% 0 auto;
  & > button,& > p,& > div{
    margin-right:40px;
    font-size:16px;
    align-items:center;
  }

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
  return (
    <Wrapper>
        <LoginButton variant="contained" >Login</LoginButton>
        <Typography style={{marginTop: 3,width:135 }}>Become a Seller</Typography>
        <Typography style={{marginTop: 3}}>More</Typography>
        <Container>
            <ShoppingCartIcon/>
            <Typography>Cart</Typography>
        </Container>
        <Container>
            <FavoriteIcon/>
            <Typography>Wishlist</Typography>
        </Container>
        <MoreVertIcon/>

    </Wrapper>
  )
}

export default CustomButton