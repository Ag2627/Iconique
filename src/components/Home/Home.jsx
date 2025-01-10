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
                <Slide products={productArray}/>
                <Slide products={productArray}/>
                <Slide products={productArray}/>
                <Slide products={productArray}/>
                <Slide products={productArray}/>
                <Slide products={productArray}/>
                <Slide products={productArray}/>
            </Component>
        </> 
        
    )
}
export default Home;
