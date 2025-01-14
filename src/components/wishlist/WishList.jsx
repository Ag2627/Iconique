import React, { useEffect } from 'react';
import { Typography, Grid, Box, styled, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EmptyWishList from './EmptyWishList';
import WishlistItem from './WishlistItem';
import { getWishList } from '@/redux/store/wishlist-slice';
const Container = styled(Grid)(({ theme }) => ({
    padding: '30px 20px',
    paddingTop: 'calc(80px + 30px)', // Adds padding considering header height
    paddingBottom: 'calc(80px + 30px)', // Adds padding considering footer height
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      paddingTop: 'calc(60px + 15px)',
      paddingBottom: 'calc(60px + 15px)',
    },
  }));
  


const Header = styled(Box)`
  padding: 15px 24px;
  background: linear-gradient(to right, #f7f7f7, #ececec);
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top:30px;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
`;

const StyledButton = styled(Button)`
  background-color: #f33a6a;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 25px;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(243, 58, 106, 0.4);
  &:hover {
    background-color: #d12d59;
    box-shadow: 0 6px 10px rgba(209, 45, 89, 0.6);
  }
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
    paddingRight: 0,
    marginBottom: 15,
  },
}));

const WishList = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const account = JSON.parse(localStorage.getItem('account'));
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getWishList(account?.id));
  }, [dispatch]);

 

  return (
    <>
      {wishlistItems.length ? (
        <Container container>
          <LeftComponent item xs={12}>
            <Header>
              <Typography>My WishList ({wishlistItems.length})</Typography>
            </Header>
            {wishlistItems.map((item) => (
              <WishlistItem key={item.productId._id}  item={item} />
            ))}
          </LeftComponent>
        </Container>
      ) : (
        <EmptyWishList />
      )}
    </>
  );
};

export default WishList;
