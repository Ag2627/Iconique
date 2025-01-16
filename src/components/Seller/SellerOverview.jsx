import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Users,Star } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats } from '@/redux/store/overviewSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const productReviews = [
  {
    id: 'product1',
    name: 'Ergonomic Chair',
    reviews: [
      { id: 1, user: 'Alice', avatar: '/avatar1.png', rating: 5, comment: 'Excellent chair, very comfortable!' },
      { id: 2, user: 'Bob', avatar: '/avatar2.png', rating: 4, comment: 'Good quality, but a bit pricey.' },
    ]
  },
  {
    id: 'product2',
    name: 'Standing Desk',
    reviews: [
      { id: 3, user: 'Charlie', avatar: '/avatar3.png', rating: 5, comment: 'Love this desk! Easy to adjust.' },
      { id: 4, user: 'Diana', avatar: '/avatar4.png', rating: 3, comment: 'Decent, but could use more features.' },
    ]
  },
  {
    id: 'product3',
    name: 'Laptop Stand',
    reviews: [
      { id: 5, user: 'Eve', avatar: '/avatar5.png', rating: 4, comment: 'Sturdy and well-designed.' },
      { id: 6, user: 'Frank', avatar: '/avatar6.png', rating: 5, comment: 'Perfect for my home office setup!' },
    ]
  },
  {
    id: 'product4',
    name: 'Mechanical Keyboard',
    reviews: [
      { id: 7, user: 'Grace', avatar: '/avatar7.png', rating: 5, comment: 'Great tactile feedback, love the clicky sound!' },
      { id: 8, user: 'Henry', avatar: '/avatar8.png', rating: 4, comment: 'Solid build quality, but a bit loud for office use.' },
    ]
  },
  {
    id: 'product5',
    name: 'Wireless Mouse',
    reviews: [
      { id: 9, user: 'Ivy', avatar: '/avatar9.png', rating: 4, comment: 'Comfortable and responsive, battery life could be better.' },
      { id: 10, user: 'Jack', avatar: '/avatar10.png', rating: 5, comment: 'Sleek design and works flawlessly!' },
    ]
  }
]
const SellerOverview = () => {
  const dispatch=useDispatch();
  const account = JSON.parse(localStorage.getItem('account'));
  const { statsList } = useSelector((state) => state.stats);
  const [selectedProduct, setSelectedProduct] = useState(productReviews[0].id)
  useEffect(() => {
      dispatch(fetchStats(account?.id));
    }, [dispatch]);
  const totalOrders = statsList.totalOrders
  const totalRevenue = statsList.totalRevenue
  const totalCustomers = 567
 
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {productReviews.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {productReviews.find(p => p.id === selectedProduct)?.reviews.map((review) => (
              <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold mr-2">{review.user}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

    </div>
  )
}

export default SellerOverview

