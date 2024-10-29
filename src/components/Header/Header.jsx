import IconiqueLogo from'../../assets/Iconique_Fashion_Logo.png';
import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material"
import Search from "./Search"
import CustomButton from './CustomButton';

const Styleheader=styled(AppBar)`
   background: #F33A6A;
   height: 55px;
`
const Component=styled(Box)`
   margin-left:10%;
`
const Subheading=styled(Typography)`
    font-size:12px;
    font-style:italic;
`
const Header = () => {
    
  return (
      <Styleheader>
        <Toolbar style={{minHeight:55}}>
            <Component>
                <img src={IconiqueLogo} alt="Logo" style={{width:45}}/>
                
            </Component>
            <Search/>
            <Box>
                <CustomButton/>
            </Box>
        </Toolbar>
      </Styleheader>
  )
}

export default Header