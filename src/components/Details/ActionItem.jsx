
import {Box, Button, styled} from '@mui/material';
import {ShoppingCart as Cart,ShoppingBag as Bag} from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useState } from 'react';
import { addToWishList, getWishList } from '@/redux/store/wishlist-slice';
import { useToast } from '@/hooks/use-toast';
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

const ActionItem=({product})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity ,setQuantity] = useState(1);
    const account=JSON.parse(localStorage.getItem('account'));
    const {toast}=useToast();

    const addItemToCart =() => {
       dispatch(addToCart(product._id,quantity));
        navigate('/cart');
    }
    function handleAddtoWishlist(getCurrentProductId){
        dispatch(addToWishList({userId:account?.id,productId:getCurrentProductId})).then(data=>{
            console.log("data tum aaye?",data);
            
            if(data?.payload?.success){
                dispatch(getWishList(account?.id));
                toast({
                    type:'success',
                    title:'Product added to wishlist',
                    message: 'Product added to wishlist successfully'
                })
            }
            
        });        
    }
    
    
        
    return (
        <LeftContainer>
            <Box style={{padding: '15px 20px',border: '1px solid #f0f0f0',width: '90%'}}>
            <img src={product.image}/>
            </Box>
            <StyledButton component="span" variant='contained' onClick={() => addItemToCart()} style={{marginRight: 10,background:'#F3245F', width:'44%'}}><Cart/>ADD TO CART</StyledButton>
            <StyledButton component="span" variant='contained' style={{background:'#F3245F', width:'44%'}}><Bag/>BUY NOW</StyledButton>
            <StyledButton component="span" variant='contained' onClick={()=>handleAddtoWishlist(product._id)} style={{marginRight: 10,background:'#F3245F', width:'44%'}}><FavoriteBorderIcon/>ADD TO WISHLIST</StyledButton>
            {/* <Button component="span" variant='contained' style={{marginRight: 10,background:'#F3245F', width:'44%'}}><Cart/>ADD TO CART</Button>
            <Button component="span" variant='contained' style={{background:'#F3245F', width:'44%'}}><Bag/>BUY NOW</Button> */}
        </LeftContainer>
    )

}

export default ActionItem;