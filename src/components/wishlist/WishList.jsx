
import { Typography,Grid,Box ,styled,Button} from "@mui/material";
import { useSelector } from "react-redux";
//components
import EmptyWishList from "./EmptyWishList";
import WishlistItem from "./WishlistItem";


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
const WishList = () =>{
    const {wishlistItems}=useSelector(state=>state.wishlist);

    return(
        <>
            {
                wishlistItems.length ?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>MyWishList ({wishlistItems.length})</Typography>
                            </Header>
                            {
                                wishlistItems.map(item => (
                                    <WishlistItem item={item}/>
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton>Add to Cart</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                    </Container>
                    :<EmptyWishList/>
            }
        </>
    )

    
}
export default WishList;