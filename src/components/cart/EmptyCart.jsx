import { Typography, Box, styled } from '@mui/material';

const Component = styled(Box)`
    height: 80vh;
    width: 80%;
    
    background: pink;
    margin : 80px 140px;
`;

const Container = styled(Box)`
    
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    height: 100%; 
    text-align: center;
    img {
        margin-bottom: 16px; /* Adds spacing below the image */
    }
`;




const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    
    return (
        <Component>
            <Container>
            <img src={imgurl} alt="empty" style={{ width : '25%'}}/>
                <Typography>Your cart is empty!</Typography>
                <Typography component="span">Add items to it now.</Typography>
            </Container>
        </Component>
    )
}

export default EmptyCart;