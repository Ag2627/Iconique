import { Box,styled,Typography,Button } from "@mui/material";
import { addEllipsis } from "@/utils/common-utils";
import { removeFromCart } from "@/redux/actions/cartActions";
import { useDispatch } from "react-redux";
import GroupedButton from "./ButtonGroup";
const Component=styled(Box)`
    border-top:1px solid #f0f0f0;
    display : flex;
    background : #fff;
`;
const LeftComponent= styled(Box)`
    margin: 20px;
    display : flex;
    flex-direction: column;

`;
const SmallText=styled(Typography)`
    color:#878787;
    font-size: 14px;
    margin-top: 10px;
`;
const Remove =styled(Button)`
    margin-top : 20px;
    font-size: 16px;
    color: #000;
    font-weight: 600
`;
const CartItem =({item}) =>{
    const dispatch =useDispatch();
    const reomoveItemfromCart =(_id) => {
        dispatch(removeFromCart(_id));
    }
    
    return (
        <Component>
            <LeftComponent>
                <img src={item.data.image} alt="product" style={{ height :110,width : 110}}/>
                <GroupedButton/>
            </LeftComponent>
            <Box style={{margin : 20}}>
                <Typography>{addEllipsis(item.data.title)}</Typography>
                <SmallText>seller:{item.data.sellerID} </SmallText>
                <Typography style={{margin:'20px 0'}}>
                    <Box component="span" style={{fontWeight:600, fontSize: 18 }}>₹{Math.ceil(item.data.price-item.data.price*item.data.discount/100)}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{color:'#878787'}}><strike>₹{item.data.price}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{color: '#388E3C'}}>-{item.data.discount}%</Box>
                </Typography>
                <Remove onClick={() => reomoveItemfromCart(item.data._id) }>Remove</Remove>
            </Box>
        </Component>
    )
}
export default CartItem;