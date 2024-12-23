
import {Box, Button, styled} from '@mui/material';
import {ShoppingCart as Cart,ShoppingBag as Bag} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useState } from 'react';
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
    

const ActionItem=({product})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity ,setQuantity] = useState(1);
    //const {id} =product;
    const addItemToCart =() => {
       dispatch(addToCart(_id,quantity));
        navigate('/cart');
    }
    return (
        <LeftContainer>
            <Box style={{padding: '15px 20px',border: '1px solid #f0f0f0',width: '90%'}}>
            <img src={product.image}/>
            </Box>
            <StyledButton component="span" variant='contained' onClick={() => addItemToCart()} style={{marginRight: 10,background:'#F3245F', width:'44%'}}><Cart/>ADD TO CART</StyledButton>
            <StyledButton component="span" variant='contained' style={{background:'#F3245F', width:'44%'}}><Bag/>BUY NOW</StyledButton>
        </LeftContainer>
    )

}

export default ActionItem;