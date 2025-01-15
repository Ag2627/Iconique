import React, { useState } from 'react';
import { User, MapPin, Package, Star, Heart } from 'lucide-react';

// Placeholder data (replace with actual data fetching in production)
const sellerData = {
  name: "Jane Doe",
  location: "New York, NY",
  rating: 4.8,
  followers: 1234,
  products: [
    { id: 1, name: "Vintage Camera", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Leather Backpack", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Wooden Desk Organizer", price: 39.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Handmade Pottery Set", price: 129.99, image: "/placeholder.svg?height=200&width=200" },
  ]
};

const Followers=()=> {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={40} className="text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{sellerData.name}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{sellerData.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-full ${
                isFollowing
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-blue-500 text-white'
              } transition duration-300 ease-in-out`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <div className="text-xl font-semibold">{sellerData.rating}</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Star size={16} className="text-yellow-400 mr-1" />
                Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{sellerData.followers}</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{sellerData.products.length}</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Package size={16} className="mr-1" />
                Products
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellerData.products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">${product.price.toFixed(2)}</span>
                <button className="text-red-500 hover:text-red-600">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Followers;