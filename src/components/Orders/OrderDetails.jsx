import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { capturePayment } from "@/redux/store/product-slice"

const OrderDetailsPage = () => {

  const {cartItems} = useSelector((state) => state.shopCart);
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get('payment_id');
  const orderId = query.get('order_id');

  const dispatch=useDispatch();

  useEffect(()=>{

    if(paymentId){
      const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));
      dispatch(capturePayment({paymentId,orderId})).then(data=>{
        if(data?.payload.success){
          sessionStorage.removeItem('currentOrderId')
          window.location.href='/payment/success-page'
        }
      })
    }
  },[paymentId,dispatch])
  
  const handlePrint = () => {
    window.print()
  }

  // const orderData={
  //   orderId:orderId,
  //   paymentId:paymentId,


  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>processing payment please wait...</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default OrderDetailsPage
