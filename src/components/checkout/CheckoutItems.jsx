import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  display: flex;
  background: #fff;
  padding: 20px;
`;

const LeftComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const ProductImage = styled('img')`
  height: 110px;
  width: 110px;
  object-fit: cover;
`;

const PriceDetails = styled(Typography)`
  margin: 10px 0;
`;

const CheckoutItems = ({ item }) => {
    // console.log("item aaya",item);
    
  return (
    <Component>
      <LeftComponent>
        <ProductImage src={item.image} alt={item.title} />
      </LeftComponent>
      <Box>
        <Typography variant="h6">{item.title}</Typography>
        <PriceDetails>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{Math.ceil(item.price - (item.price * item.discount) / 100)}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: '#878787' }}>
            <strike>₹{item.price}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: '#388E3C' }}>
            -{item.discount}%
          </Box>
        </PriceDetails>
      </Box>
    </Component>
  );
};

export default CheckoutItems;
