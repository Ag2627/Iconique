import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"


const OrderDetailsPage = () => {

  const {cartItems} = useSelector((state) => state.shopCart);
  // const query = new URLSearchParams(useLocation().search);
  // const paymentId = query.get('payment_id');
  // const orderId = query.get('order_id');
  console.log("ye mere cart items hai:",cartItems);
  
  const handlePrint = () => {
    window.print()
  }

  // const orderData={
  //   orderId:orderId,
  //   paymentId:paymentId,


  // }

  return (
    <div>
      aapki payment id ha
      humare sath shopping karne ke liye bahut bahut shukriya
      aate rahiye
    </div>
    // <div className="container mx-auto p-4 space-y-6">
    //   <div className="flex justify-between items-center">
    //     <h1 className="text-3xl font-bold">Order Details</h1>
    //     <Button onClick={handlePrint} className="print:hidden">
    //       <Printer className="mr-2 h-4 w-4" /> Print Order
    //     </Button>
    //   </div>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Order Summary</CardTitle>
    //     </CardHeader>
    //     <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    //       <div>
    //         <p className="text-sm font-medium">Order ID</p>
    //         <p>{orderData.orderId}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm font-medium">Order Date</p>
    //         <p>{orderData.orderDate}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm font-medium">Status</p>
    //         <Badge variant="outline">{orderData.status}</Badge>
    //       </div>
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Shipping Address</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <p>{orderData.shippingAddress.street}</p>
    //       <p>
    //         {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
    //       </p>
    //       <p>{orderData.shippingAddress.country}</p>
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Products</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Product</TableHead>
    //             <TableHead>Quantity</TableHead>
    //             <TableHead>Price</TableHead>
    //             <TableHead>Total</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {orderData.products.map((product) => (
    //             <TableRow key={product.id}>
    //               <TableCell>{product.name}</TableCell>
    //               <TableCell>{product.quantity}</TableCell>
    //               <TableCell>${product.price.toFixed(2)}</TableCell>
    //               <TableCell>${(product.quantity * product.price).toFixed(2)}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Payment Information</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <p>
    //         <strong>Payment ID:</strong> {orderData.paymentId}
    //       </p>
    //       <div className="mt-4">
    //         <p className="flex justify-between">
    //           <span>Subtotal:</span> <span>${orderData.subtotal.toFixed(2)}</span>
    //         </p>
    //         <p className="flex justify-between">
    //           <span>Shipping:</span> <span>${orderData.shippingCost.toFixed(2)}</span>
    //         </p>
    //         <p className="flex justify-between">
    //           <span>Tax:</span> <span>${orderData.tax.toFixed(2)}</span>
    //         </p>
    //         <p className="flex justify-between font-bold mt-2">
    //           <span>Total:</span> <span>${orderData.total.toFixed(2)}</span>
    //         </p>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  )
}

export default OrderDetailsPage
