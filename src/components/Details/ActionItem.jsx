
import {Box, Button, styled} from '@mui/material';
import {ShoppingCart as Cart,ShoppingBag as Bag} from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { addToCart, fetchCartItems } from '@/redux/store/cart-slice';
import { useToast } from '@/hooks/use-toast.js';

import { addToWishList, getWishList } from '@/redux/store/wishlist-slice';

// import { paymentServices } from '../../service/paymentServices';
// import { PaymentScript } from '../../utils/PaymentScript';

const LeftContainer=styled(Box)(({theme})=>({
    minWidth:'40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]:{
        padding:'20px 40px'
    }
}));
    


const Image=styled('img')({
    padding:'15px'
});

const StyledButton=styled(Button)(({theme})=>({
    width:'48%',
    height: 50, //50px -px lihna zaroori nahi hai vo automatically utha lega
    borderRadius: '2px',
    [theme.breakpoints.down('lg')]:{
        width:'46%'
    },
    [theme.breakpoints.down('sm')]:{
        width: '48%'
    }
}))

// const buyNow=()=>{
//         const amount = 500; 
//         const title = "Product Title";
//         paymentServices(amount, title);
// }

const ActionItem=({product,handleAddtoCart})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} =useToast();
    const [quantity ,setQuantity] = useState(1);
    const account =JSON.parse(localStorage.getItem('account'));
    function handleAddtoCart (getCurrentProductId){
        dispatch(addToCart({userId: account?.id,productId:getCurrentProductId,quantity : 1})).then(
            data=>{
                if(data?.payload?.success){
                    dispatch(fetchCartItems(account?.id));
                    toast({
                        type :'success',
                        title:'product added to cart',
                        
                    })
                }
            }
        )
    } 

    return (
        <LeftContainer>
    <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', width: '90%' }}>
        <img src={product.image} alt="product" />
    </Box>
    <Box display="flex" flexDirection="column" gap="10px" style={{ width: '90%' }}>
        <StyledButton
            component="span"
            variant="contained"
            onClick={() => handleAddtoCart(product?._id)}
            style={{ background: '#F3245F', width: '100%' }}
        >
            <Cart /> ADD TO CART
        </StyledButton>
        <StyledButton
            component="span"
            variant="contained"
            style={{ background: '#F3245F', width: '100%' }}
        >
            <Bag /> BUY NOW
        </StyledButton>
        <StyledButton
            component="span"
            variant="contained"
            onClick={() => handleAddtoWishlist(product._id)}
            style={{ background: '#F3245F', width: '100%' }}
        >
            <FavoriteBorderIcon /> ADD TO WISHLIST
        </StyledButton>
    </Box>
</LeftContainer>

    )

}

export default ActionItem;