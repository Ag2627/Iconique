import React from 'react';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { RemoveFromWishList } from '@/redux/store/wishlist-slice';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const WishlistItem = ({ item }) => {
  const account = JSON.parse(localStorage.getItem('account'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleWishlistItemDelete = (getWishlistItem) => {
    dispatch(
      RemoveFromWishList({ userId: account?.id, productId: getWishlistItem.productId._id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: 'Wishlist item deleted successfully',
        });
      }
    });
  };

  return (
    <div
      className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200"
    >
      {/* Product Image */}
      <div className="relative w-full md:w-1/4">
        <img
          src={item?.productId?.image}
          alt={item?.productId?.title}
          className="w-full h-auto rounded-lg object-cover transform transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <h3
          onClick={() => handleProductClick(item.productId._id)}
          className="font-bold text-xl text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
        >
          {item?.productId?.title}
        </h3>
        <p className="text-sm text-gray-500">
          Average Review: {item.productId.averageReview || 'No reviews yet'}
        </p>
        <div className="flex items-center space-x-2">
          <p className="line-through text-sm text-gray-500">₹{item?.productId?.price}</p>
          <p className="text-sm text-red-500 font-medium">%{item?.productId?.discount} OFF</p>
        </div>
        <p className="font-semibold text-lg text-gray-900">
          ₹
          {item?.productId?.price -
            (item?.productId?.price * item?.productId?.discount) / 100}
        </p>
      </div>

      {/* Delete Button */}
      <div className="flex-shrink-0">
        <Trash
          onClick={() => handleWishlistItemDelete(item)}
          size={24}
          className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default WishlistItem;
