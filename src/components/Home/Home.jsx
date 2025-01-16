import { useEffect } from "react";
//we have to call our getproduct api as soon as it is rendered
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import { Fragment } from "react";
import { Box,styled } from "@mui/material";
import { fetchProducts } from "@/redux/actions/productAction";
import { useDispatch ,useSelector} from "react-redux";
const Component = styled(Box)`
    padding :10px
    background: #F33A6A;

`
//useSelector hook is used to fetch products from redux
const Home = () =>{
    const { products } = useSelector((state) => state.fetchProducts)
    //const { products } = fetchProducts;//object destructuring
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    },[dispatch])

    const productArray =products?.data || [];
    
    return(
        <>
            <NavBar/>
            <Component>
                <Banner/>
                <Slide products={productArray} title="Deal of the Day" timer={true}/>
                <Slide products={productArray} title="Bejeweled and Bright" timer={false}/>
                <Slide products={productArray} title="Dapper & Distinguished" timer={false}/>
                <Slide products={productArray} title="Tiny Trendsetters" timer={false}/>
                <Slide products={productArray} title="Stride & Style" timer={false}/>
                <Slide products={productArray} title="Adorn & Elevate" timer={false}/>
                
            </Component>
        </> 
        
    )
}
export default Home;
