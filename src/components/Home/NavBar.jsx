import { Box ,styled, Typography } from "@mui/material";
import { navData } from "../../data";

const Component = styled(Box)`
    display : flex;
    margin : 55px 130px 0px 130px;
    justify-content : space-between;
    background : #fff;
`
 const Text =styled(Typography)`
    font-size : 20px;
    font-weight : 600;
    font-family : inherit;
 `   
const NavBar = ()=>{
    return (
        <Box style={{background : '#fff'}}>
            <Component>{
             navData.map(data => (
                <Box>
                    <Text>{data.text}</Text>
                </Box>
             ))
            }
        </Component>
        </Box>
        
    )

    
}
export default NavBar;