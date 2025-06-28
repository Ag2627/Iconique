import { Typography,Box,styled } from "@mui/material";
import { TableBody,TableCell,TableRow,Table } from "@mui/material";
import SustainabilityTag from "./SustainabilityTag";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "@/redux/store/review-slice";
import { toast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const ColumnText=styled(TableRow)`
    font-size: 14px;
    & > td {
        font-size:14px
    }
`
const date=new Date(new Date().getTime()+(5*24*60*60*1000));
const ProductDetail=({product})=>{
    const [reviewMsg,setReviewMsg]=useState('');
    const [rating,setRating]=useState(0);
    const dispatch=useDispatch();
    const account=JSON.parse(localStorage.getItem('account'))
    const navigate = useNavigate();

    const {reviewList}=useSelector((state)=>state.review);
    
    function handleRatingChange(getRating){
        setRating(getRating);
    }

    const handleSellerClick = () => {
      // Navigate to the seller details page with the seller's data in state
      navigate('/sellerdetails', { state: { seller: product.sellerId } });
    };
    
    function handleAddReview(){
        dispatch(addReview({
            productId:product._id,
            userId:account.id ,
            userName:account.name,
            reviewMessage:reviewMsg ,
            rating:rating ,
        })).then(data=>{
            setRating(0);
            setReviewMsg('')
            console.log("data",data)
            if (data?.payload?.success) {
              toast({ title: "Review added successfully ✅" });
              dispatch(getReviews(product._id));
            } else {
              toast({
                title: data?.payload || "Failed to add review",
                variant: "destructive",
              });
            }
            
        })
    }
    useEffect(()=>{
        if(product!==null) dispatch(getReviews(product?._id))
    },[product]);
    const averageReview= reviewList && reviewList.length>0?
    reviewList.reduce((sum, item)=>sum+item.rating,0)/reviewList.length :0;
    return(
        <>
        <Typography>{product.title}</Typography>
        
        <Typography component="span" style={{marginTop:5, color:'#878787',fontSize:14 }}>
            <SustainabilityTag isSus={product.sustainable}/>
        </Typography>
        <Typography>
            <Box component="span" style={{fontSize:28 }}>₹{product.price-product.price*product.discount/100}</Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{color:'#878787'}}><strike>₹{product.price}</strike></Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{color: '#388E3C'}}>-{product.discount}%</Box>
        </Typography>
        <Typography style={{fontSize:20}}>{product.tagline}</Typography>
        <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

        <TableBody>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹99</TableCell>
            </ColumnText>

            <ColumnText>
                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                <TableCell  style={{fontWeight:600}} onClick={handleSellerClick}>{product?.sellerId?.name || ""}</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Description</TableCell>
                <TableCell style={{fontWeight:600}}>{product.description}</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Return</TableCell>
                <TableCell style={{fontWeight:600}}>7 days hassle-free return</TableCell>
            </ColumnText>
        </TableBody>
        <Separator/>
        <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviewList && reviewList.length > 0 ? (
                reviewList.map((reviewItem) => (
                  <div  className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.rating}  />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

        <div className="mt-10 flex flex-col gap-2">
            <Label>
                Write a Review
            </Label>
            <div className="flex gap-1">
                <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
            </div>
            <Input name="reviewMessage" value={reviewMsg} onChange={(event)=>setReviewMsg(event.target.value)} placeholder="Write a Review"/>
            <Button onClick={handleAddReview} disabled={reviewMsg.trim()===""}>Submit</Button>
        </div>
        </div>
        </>
    );
}

export default ProductDetail; 