import { useEffect } from "react";
//we have to call our getproduct api as soon as it is rendered
import NavBar from "./NavBar";
import Banner from "./Banner";
import { Fragment } from "react";
import { Box,styled } from "@mui/material";
import { fetchProducts } from "@/redux/actions/productAction";
import { useDispatch ,useSelector} from "react-redux";
const component = styled(Box)`
    padding :10px
    background: #F2F2F2;

`
const Home = () =>{
    const getProducts=useSelector(state => state.getProducts)
    const { products } =fetchProducts;//object destructuring
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    },[dispatch])
    return(
        <>
            <NavBar/>
            <component>
                <Banner/>
            </component>
        </> 
        
    )
}
export default Home;
