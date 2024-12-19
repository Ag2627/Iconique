import IconiqueLogo from'../../assets/Iconique_Fashion_Logo.png';
import { AppBar, Box, IconButton,Drawer, styled,List,ListItem, Toolbar, Typography } from "@mui/material"
import Search from "./Search"
import {Menu} from '@mui/icons-material';
import CustomButton from './CustomButton';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
const Styleheader=styled(AppBar)`
   background: #F33A6A;
   height: 55px;
`
const CustomButtonWrapper=styled(Box)(({theme})=>({
    margin:'0 5% 0 auto',
    [theme.breakpoints.down('sm')]:{
        dislay:'none'
    }
}));
const Component=styled(Link)`
   margin-left:10%;         
`
const Subheading=styled(Typography)`
    font-size:12px;
    font-style:italic;
`
const MenuButton=styled(IconButton)(({theme})=>({
    width:40,
    display:'none',
    [theme.breakpoints.down('sm')]:{
        display:'block',

    }

}))

    
const Header = () => {
    const [open,setOpen]=useState(false);
    const handleOpen=()=>{
        setOpen(true);
        // console.log(open);

    }
    const handleClose=()=>{
        setOpen(false);
        // console.log(open);
    }
    const list=()=>(
        <Box style={{width:250}} onClick={handleClose}>
            <List>
                <ListItem button>
                    <CustomButton/>
                </ListItem>
            </List>
        </Box>
    );
    useEffect(()=>{
        console.log("drawer ",open);
    },[open])
  return (
      <Styleheader>
        <Toolbar style={{minHeight:55}}>
            <MenuButton color='inherit' onClick={handleOpen}>
                <Menu/>
            </MenuButton>
            <Drawer open={open} onClose={handleClose}>
                {list()}
            </Drawer>
            <Component to='/'>
                <img src={IconiqueLogo} style={{width:45}}/>
                
            </Component>
            <Search/>
            
            <CustomButtonWrapper>
                <CustomButton/>
            </CustomButtonWrapper>
        </Toolbar>
      </Styleheader>
  )
}

export default Header