import React from 'react'
import  CartItem from '../cart/CartItem';
import TotalView from "../cart/TotalView";
import { useSelector } from 'react-redux';
import { Box,Grid,styled,Button,Typography } from '@mui/material';

import CheckoutItems from './Checkout';

const Container = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
      padding: '15px 0'
  }
}));
const Header = styled(Box)`
      padding: 15px 24px;
      background: #fff;
`;
const ButtonWrapper =styled(Box)`
  padding : 16px 22px;
  background: #fff;
  box-shadow :0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top : 1px solid #f0f0f0;

`;
const StyledButton = styled(Button)`
  display : flex;
  margin-left : auto;
  background  : #F33A6A;
  color : #fff;
  width : 250px;
  height : 51px;
  border-radius : 2px;
`;
const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
      marginBottom: 15
  }
}));
const Checkout = () =>{
  const {cartItems} =useSelector(state => state.cart);

  return(
      <>
          {
              
                  <Container container>
                      <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                          {/* <Header>
                              <Typography>MyCart ({cartItems.length})</Typography>
                          </Header> */}
                          {
                              // cartItems.map(item => (
                              //     <CheckoutItems key={item.data._id} item={item}/>
                              // ))
                              
                              
                              cartItems[0].data.title
                          }
                          {/* {cartItems.length > 0 ? (
            cartItems.map((item) => (
              
              
                <CheckoutItems key={item.data._id} item={item}/>
            ))
          ) : (
            <Typography>No items in your cart</Typography>
          )} */}
                          
                          
                      </LeftComponent>
                      <Grid item lg={3} md={3} sm={12} xs={12}>
                          <TotalView cartItems={cartItems}/>

                      </Grid>
                          

                  </Container>
          }
      </>
  )

  
}

export default Checkout;