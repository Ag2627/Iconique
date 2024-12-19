import { Typography,Box,styled } from "@mui/material";
import { TableBody,TableCell,TableRow,Table } from "@mui/material";
import SustainabilityTag from "./SustainabilityTag";

const ColumnText=styled(TableRow)`
    font-size: 14px;
    & > td {
        font-size:14px
    }
`
const date=new Date(new Date().getTime()+(5*24*60*60*1000));
const ProductDetail=({product})=>{
    return(
        <>
        <Typography>{product.title}</Typography>
        
        <Typography component="span" style={{marginTop:5, color:'#878787',fontSize:14 }}>yaha par no of reviews aur rating hogi aur side me sus tag
            <SustainabilityTag isSus={product.sustainable}/>
        </Typography>
        <Typography>
            <Box component="span" style={{fontSize:28 }}>₹{Math.ceil(product.price-product.price*product.discount/100)}</Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{color:'#878787'}}><strike>₹{product.price}</strike></Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{color: '#388E3C'}}>-{product.discount}%</Box>
        </Typography>
        <Typography style={{fontSize:20}}>{product.tagline}</Typography>
        <TableBody>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹99</TableCell>
            </ColumnText>

            <ColumnText>
                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                <TableCell style={{fontWeight:600}}>{product.sellerId}</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Description</TableCell>
                <TableCell style={{fontWeight:600}}>{product.description}</TableCell>
            </ColumnText>
            <ColumnText>
                <TableCell style={{color:'#878787'}}>Return</TableCell>
                <TableCell style={{fontWeight:600}}>7 days hassle-free return</TableCell>
            </ColumnText>
        </TableBody>
        </>
    )
}

export default ProductDetail; 