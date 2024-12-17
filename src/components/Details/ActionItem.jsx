
import {Box, Button, styled} from '@mui/material';
import {ShoppingCart as Cart,ShoppingBag as Bag} from '@mui/icons-material';

const LeftContainer=styled(Box)`
    min-width:40%;
    padding: 40px 0 0 80px;

`;
const Image=styled('img')({
    padding:'15px'
});

const StyledButton=styled(Button)`
    width:48%;
    height: 50px;
    border-radius: 2px;
`
const ActionItem=({product})=>{
    return (
        <LeftContainer>
            <Box style={{padding: '15px 20px',border: '1px solid #f0f0f0',width: '90%'}}>
            <img src={product.image}/>
            </Box>
            <Button component="span" variant='contained' style={{marginRight: 10,background:'#F3245F', width:'44%'}}><Cart/>ADD TO CART</Button>
            <Button component="span" variant='contained' style={{background:'#F3245F', width:'44%'}}><Bag/>BUY NOW</Button>
        </LeftContainer>
    )

}

export default ActionItem;