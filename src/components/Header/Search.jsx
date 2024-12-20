import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, ListItem,List, styled } from '@mui/material'
import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts as listProducts} from '@/redux/actions/productAction';
import {Link} from 'react-router-dom';

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
const ListWrapper=styled(List)`
    position:absolute;
    background:#FFFFFF;
    color:#000;
    margin-top:40px

`
const Search = () => {
  
    const [text,setText]=useState();
    const [open,setOpen]=useState(true);
    
    const fetchProducts=useSelector(state=>state.fetchProducts);
    
    const {products}=fetchProducts;
    
    //logging all products on console
    // useEffect(() => {
    //     if (Array.isArray(products.data)) {
    //       for (let i = 0; i < products.data.length; i++) {
    //         console.log(`Product ${i + 1}:`, products.data[i]);
    //       }
    //     }
    //     else{
    //         console.log("not an array");
            
    //     }
    //   }, [products]); 
    
    
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])
   
    const getText=(text)=>{
        setText(text);
        setOpen(false);
    };
    return (
        
    <Searchcontainer>
        <InputSearchBase 
        placeholder='Search your style,brands,TV icons and more'
        onChange={(e)=>getText(e.target.value)}
        value={text}/>
        <Searchiconwrapper>
            <SearchIcon/>
        </Searchiconwrapper>
        {
            text && 
                <ListWrapper>
                    {
                        products.data.filter((product)=> product.title && product.title.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <ListItem key={product._id}>
                                <Link to={`product/${product._id}`} onClick={()=>setText('')} style={{textDecoration:'none', color:'inherit'}}>
                                {product.title}
                                </Link>
                            </ListItem>
                        ))

                        
                    }
                </ListWrapper>
        }
    </Searchcontainer>
  )
}

export default Search