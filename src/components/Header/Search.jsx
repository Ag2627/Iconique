import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, styled } from '@mui/material'
import React, { useState } from 'react'


const Searchcontainer=styled(Box)`
    background:#ffffff;
    width:38%;
    border-radius:2px;
    margin-left:10px;
    display:flex;
`;
const Searchiconwrapper=styled(Box)`
    color:#A52448;
    padding:5px;

`
const InputSearchBase=styled(InputBase)`
    padding-left:20px;
    width:100%;
    font-size:unset;
`
const Search = () => {
  
    const [text,setText]=useState();
    const [open,setOpen]=useState(false);
    const getText=(text)=>{
        setText(text);
        setOpen(false);
    };
    return (
    <Searchcontainer>
        <InputSearchBase 
        placeholder='Search your style,brands,TV icons and more'
        onChange={(e)=>getText(e.target.value)}/>
        <Searchiconwrapper>
            <SearchIcon/>
        </Searchiconwrapper>
    </Searchcontainer>
  )
}

export default Search