import {Link} from 'react-router-dom';
import { Typography,Grid,Box ,styled,Button} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//components
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import { useEffect } from "react";
import { fetchCartItems } from "@/redux/store/cart-slice";
import { paymentServices } from "../../service/paymentServices.jsx";

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
// const buyNow=()=>{
    
//         const amount = 500; 
//         const title = "Product Title";
//         paymentServices(amount, title);
// }
const Cart = () =>{
    const { cartItems } =useSelector(state => state.shopCart);
    const account =JSON.parse(localStorage.getItem('account'));
    const dispatch = useDispatch();
    console.log("ites",cartItems)
    useEffect(() =>{
        dispatch(fetchCartItems(account?.id));

    },[dispatch]);

    return(
        <>
            {
                cartItems.length ?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>MyCart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item => (
                                    <CartItem item={item}/>


                                ))
                            }
                            <ButtonWrapper>
                                <Link to="/checkout">
                                <StyledButton>Place Order</StyledButton>
                                </Link>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalView cartItems={cartItems}/>

                        </Grid>


                    </Container>
                    :<EmptyCart/>
            }
        </>
    )

    
}
export default Cart;