import NavBar from "./NavBar";
import Banner from "./Banner";
import { Fragment } from "react";
import { Box,styled } from "@mui/material";

const component = styled(Box)`
    padding :10px
    background: #F2F2F2;

`
const Home = () =>{
    return(
        <>
            <NavBar/>
            <Box>
                <Banner/>
            </Box>
        </> 
        
    )
}
export default Home;
