import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '@/redux/store/overviewSlice';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchProducts } from '@/redux/store/seller/products-slice';
import { getReviews } from '@/redux/store/review-slice';

const SellerOverview = () => {
  const dispatch = useDispatch();
  const account = JSON.parse(localStorage.getItem('account'));

  const { statsList } = useSelector((state) => state.stats);
  const { reviewList } = useSelector((state) => state.review);
  const { productList } = useSelector((state) => state.adminProducts);

  const [selectedProduct, setSelectedProduct] = useState('');

  // Fetch seller stats
  useEffect(() => {
    if (account?.id) {
      dispatch(fetchStats(account?.id));
    }
  }, [account?.id, dispatch]);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fetch reviews for the selected product
  useEffect(() => {
    if (selectedProduct) {
      dispatch(getReviews(selectedProduct)); // Pass the selected product ID directly
    }
  }, [selectedProduct, dispatch]);

  const totalOrders = statsList.totalOrders || 0;
  const totalRevenue = statsList.totalRevenue || 0;
  const totalCustomers=900;
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

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
      </div>
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
              {productList.length > 0 ? (
                productList.map((product) => (
                  <SelectItem key={product._id} value={product._id}>
                    {product.title} {/* Use the correct field name */}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No products available</SelectItem>
              )}
            </SelectContent>
          </Select>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {reviewList.length > 0 ? (
              reviewList.map((review) => (
                <div key={review._id} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold mr-2">{review.userName}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-600">{review.reviewMessage}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No reviews for this product.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOverview;
