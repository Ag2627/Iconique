import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "@/redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import ActionItem from './ActionItem';
import { Box,Grid, Typography,styled } from "@mui/material";

const Component=styled(Box)`
    background: #F2F2F2;
    margin-top: 55px;

`;

const Container=styled(Grid)`
    background: #FFFFFF;
    display: flex;
`;

const RightContainer=styled(Grid)`
    margin-top: 50px;
`
const DetailView=()=>{
    const dispatch=useDispatch();
    const {id}=useParams();

    const {loading,product}=useSelector(state=>state.fetchProductDetails);

    useEffect(()=>{
        if(product && id!==product.id)
        dispatch(fetchProductDetails(id))
    },[dispatch,id,product,loading])
    return(<>
        <Component>
            {
                product && Object.keys(product).length &&
                    <Container container>
                        {/* left side ki image ke liye */}
                        <Grid item lg={4} md={4} sm={8} xs={12}>
                            <ActionItem product={product}/>
                        </Grid>
                        {/* right side pe details ke liye */}
                        <RightContainer item lg={8} md={8} sm={8} xs={12}>
                            <Typography>{product.title}</Typography>
                            <Typography style={{marginTop:5, color:'#878787',fontSize:14 }}>yaha ppar no of reviews aur rating hogi<Box component="span"><img src="" /></Box></Typography>
                        </RightContainer>
                    </Container>

            }
        </Component>
        </>
    )
}
export default DetailView;