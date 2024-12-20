
import {Box, Button, styled} from '@mui/material';
import {ShoppingCart as Cart,ShoppingBag as Bag} from '@mui/icons-material';

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
    return (
        <LeftContainer>
            <Box style={{padding: '15px 20px',border: '1px solid #f0f0f0',width: '90%'}}>
            <img src={product.image}/>
            </Box>
            <styledButton component="span" variant='contained' style={{marginRight: 10,background:'#F3245F', width:'44%'}}><Cart/>ADD TO CART</styledButton>
            <styledButton component="span" variant='contained' style={{background:'#F3245F', width:'44%'}}><Bag/>BUY NOW</styledButton>
        </LeftContainer>
    )

}

export default ActionItem;