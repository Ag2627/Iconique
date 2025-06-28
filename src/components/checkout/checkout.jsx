import React, { useMemo, useEffect, useState } from 'react';
import CheckoutItems from './CheckoutItems';
import TotalView from '../cart/TotalView';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, styled, Button, Typography } from '@mui/material';
import ManageAddresses from '../Profile/ManageAddresses';
import { fetchCartItems } from '@/redux/store/cart-slice';
import { paymentServices } from '@/service/paymentServices';
import {calculateCartTotals} from '../../utils/cart-utils'
import {createNewOrder} from '../../redux/store/product-slice'
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const Container = styled(Grid)(({ theme }) => ({
  padding: '20px 80px', // Reduced padding for better balance
  display: 'flex',
  marginTop:'20px',
  gap: '20px', // Add spacing between left and right components
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '15px 40px',
    flexDirection: 'column', // Stack components vertically on medium and small screens
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  flex: 0.6, // Reduced the width for the left component
  paddingRight: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '15px',
  },
}));

const StyledRightComponent = styled(Grid)(({ theme }) => ({
  flex: 0.4, // Increased the width for the right component
  backgroundColor: '#f9f9f9',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #f33a6a;
  color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  &:hover {
    background: #d32f5a;
  }
`;

const Checkout = () => {
  // const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const [currAddress,setCurrAddress]=useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isPaymentStart,setIsPaymentStart]=useState(false);
  const isLoading = useSelector((state) => state.shopCart.isLoading);
  const account = JSON.parse(localStorage.getItem('account'));
  // console.log("user id: ",account.id);
  // console.log("current address: ",currAddress);
  // console.log("yelo cart items checkout me",cartItems);
  const {toast} = useToast();
  

  // useEffect(() => {
  //   dispatch(fetchCartItems(account?.id));
  // }, [dispatch]);

  if (isLoading) return <p>Loading cart items...</p>;

  
  // if (cartItems.length === 0) return <p>Your cart is empty</p>;
  // console.log(cartItems);
  
  const { totalPrice, totalDiscount } = calculateCartTotals(cartItems);
  const handleInitiatePayment=()=>{

    if(cartItems.length ===0){
      toast({
        title: "Your cart feels empty. Time to add some glamour to it",
        type: "success",
      })
      return;

    }
    if(currAddress===null){
      toast({
        title: "please select an address to proceed.",
        type: "success",
      })
      return;

    }

    const orderData={
      userId:account?.id,
      cartId:cartItems?._id,
      cartItems:cartItems.map(singleCartItem=>({
          productId: singleCartItem.productId,
          title: singleCartItem.title,
          image: singleCartItem.image,
          price: singleCartItem.price,
          quantity: singleCartItem.quantity,
      })),
      addressInfo:{
        addressId: currAddress?._id,
        address: currAddress?.address,
        city: currAddress?.city,
        pincode: currAddress?.pincode,
        phone: currAddress?.phone,
        notes: currAddress?.notes,
      },
      orderStatus:'pending',
      paymentMethod:'razorpay',
      paymentStatus:'pending',
      totalAmount:totalPrice,
      orderDate:new Date(),
      orderUpdateDate: new Date(),
      paymentId:'',
      payerId:'',
  }
  paymentServices(orderData,navigate,dispatch);
  console.log("Order Data: ",orderData);
  
  }
// const buyNow=()=>{
//   paymentServices(totalPrice);

// }

  return (
    <Container container>
      <LeftComponent item>
        <Header>My Cart ({cartItems.length})</Header>
        {cartItems.map((item) => (
          <CheckoutItems key={item.productId} item={item} />
        ))}
        <TotalView cartItems={cartItems} />
        <Button style={{backgroundColor:'#F33A6A', color:'white',padding:'10px 3px',flexBasis:'90%'}} onClick={handleInitiatePayment}>{isPaymentStart?'Processing Payment...':'Checkout'}</Button>
      </LeftComponent>
      <StyledRightComponent item>
        <ManageAddresses selectedId={currAddress}setCurrAddress={setCurrAddress}/>
      </StyledRightComponent>
    </Container>
  );
};

export default Checkout;
