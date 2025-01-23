import { Box,styled,Typography,Button } from "@mui/material";
//import { addEllipsis } from "@/utils/common-utils";
//import { removeFromCart } from "@/redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
//import GroupedButton from "./ButtonGroup";
import { useNavigate } from "react-router-dom";
import { deleteCartItem, updateCartItem } from "@/redux/store/cart-slice";
import { toast } from "@/hooks/use-toast";
import { Minus, Plus } from "lucide-react";
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
    const account =JSON.parse(localStorage.getItem('account'));
    const dispatch =useDispatch();
    const { cartItems } = useSelector((state) => state.shopCart);
    const navigate= useNavigate();
    const {products}=useSelector((state)=>state.fetchProducts)
    // const reomoveItemfromCart =(_id) => {
    //     dispatch(removeFromCart(_id));
    // }
    // console.log("CART",cartItems)
    function handleUpdateQuantity(getCartItem, typeOfAction) {
        if (typeOfAction == "plus") {
          let getCartItems = cartItems || [];
          if (getCartItems.length) {
            
            const indexOfCurrentCartItem = getCartItems.findIndex(
              (item1) => item1.productId === getCartItem?.productId
            );
    
            const getCurrentProductIndex = products.data.findIndex(
              (product) => product._id === getCartItem?.productId
            );
            const getTotalStock = products.data[getCurrentProductIndex].totalStock;
    
            console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");
    
            if (indexOfCurrentCartItem > -1) {
              const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
              if (getQuantity + 1 > getTotalStock) {
                toast({
                  title: `Only ${getQuantity} quantity can be added for this item`,
                  variant: "destructive",
                });
    
                return;
              }
            }
          }
        }
    
        dispatch(
          updateCartItem({
            userId: account?.id,
            productId: getCartItem?.productId,
            quantity:
              typeOfAction === "plus"
                ? getCartItem?.quantity + 1
                : getCartItem?.quantity - 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "Cart item is updated successfully",
            });
          }
        });
      }
    
      
          
    const handleCartItemDelete = (getCartItem) =>{
        
        dispatch(
            deleteCartItem({userId : account?.id,productId : getCartItem.productId})
        ).then((data) => {
            if(data?.payload?.success){
                toast({
                    title : "cart item is deleted successfully",
                })
            }
        })
    }
    
    return (
        <Component>
            <LeftComponent>
                <img src={item.image} alt="product" style={{ height :110,width : 110}}/>
                <div className="flex-1">
                <h3 className="font-extrabold">{item?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                <Button
                variant="outline"
                className="h-8 w-8 rounded-full"
                size="icon"
                disabled={item?.quantity === 1}
                onClick={() => handleUpdateQuantity(item, "minus")}
                >
                <Minus className="w-4 h-4" />
                <span className="sr-only">Decrease</span>
                </Button>
            <span className="font-semibold">{item?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(item, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
            </LeftComponent>
            <Box style={{margin : 20}}>
                <Typography>{item.title}</Typography>
                {/* <SmallText>seller:{item.sellerID} </SmallText> */}
                <Typography style={{margin:'20px 0'}}>
                    <Box component="span" style={{fontWeight:600, fontSize: 18 }}>₹{(item.price-item.price*item.discount/100)}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{color:'#878787'}}><strike>₹{item.price}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{color: '#388E3C'}}>-{item.discount}%</Box>
                </Typography>
                <Remove onClick={() => handleCartItemDelete(item) }>Remove</Remove>
            </Box>
        </Component>
    )
}
export default CartItem;