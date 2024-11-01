import { Box ,styled, Typography } from "@mui/material";
import { navData } from "../../data";

const Component = styled(Box)`
    display : flex;
    margin : 55px 130px 0px 130px;
    justify-content : space-between;
`
 const Text =styled(Typography)`
    font-size : 20px;
    font-weight : 600;
    font-family : inherit;
 `   
const NavBar = ()=>{
    return (
        <Component>{
             navData.map(data => (
                <Box>
                    <Text>{data.text}</Text>
                </Box>
             ))
            }
        </Component>
    )

    
}
export default NavBar;