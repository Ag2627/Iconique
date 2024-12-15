
import {Box, Button, styled} from '@mui/material';

const LeftContainer=styled(Box)`
    min-width:40%;
    padding: 40px 0 0 80px;

`;
const Image=styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%',
})
const ActionItem=({product})=>{
    return (
        <LeftContainer>
            <img src={product.image}/>
            <Button variant='contained'>ADD TO CART</Button>
            <Button variant='contained'>BUY NOW</Button>
        </LeftContainer>
    )

}

export default ActionItem;