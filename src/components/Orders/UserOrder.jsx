import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from "../ui/badge";
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import UserOrderDetails from './UserOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails } from '../../redux/store/product-slice/index'


const UserOrder = () => {
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);  
  const dispatch =useDispatch();
  const account =JSON.parse(localStorage.getItem('account'));
  const {orderList,orderDetails}= useSelector(state=>state.shoppingOrder)
  const userId=account.id

  function handleFetchOrderDetails(getId) {
    setOpenDetailsDialog(true);
    dispatch(getOrderDetails(getId));
  }

  useEffect(()=>{
    dispatch(getAllOrdersByUserId(userId))
  },[dispatch])
  console.log(account?.id);
  
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);
  console.log(orderDetails,"orderDetails");
  console.log(orderList,"list");
  
  
  return (
    <Card>
        <CardHeader>
            <CardTitle> Order History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead><span className='sr-only'>Details</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      orderList && orderList.length>0 ?
                      orderList.map(orderItem=> <TableRow>
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                        <TableCell>
                        <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                        </TableCell>
                        <TableCell>₹{orderItem?.totalAmount}</TableCell>
                        <TableCell>
                        <Dialog open={openDetailsDialog} onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}>
                        <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                        <UserOrderDetails orderDetails={orderDetails} />  
                        </Dialog>   
                        </TableCell>
                    </TableRow>)
                    :null
                    }
                    
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default UserOrder;