import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, ListItem,List, styled } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts } from '@/redux/actions/productAction';

const Searchcontainer=styled(Box)`
    background:#ffffff;
    width:40%;
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
    const {products}=useSelector(state=>state.fetchProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
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
        {
            text && 
                <List>
                    {
                        products.filter(product=>product.title.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <ListItem>
                                {product.title}
                            </ListItem>
                        ))
                    }
                </List>
        }
    </Searchcontainer>
  )
}

export default Search