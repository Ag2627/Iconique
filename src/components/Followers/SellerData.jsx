import React, { useState, useEffect } from 'react';
import { User, MapPin, Package, Star, Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerData = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const seller = location.state?.seller;

  // Redirect back if no seller data is found
  if (!seller) {
    navigate(-1); // Go back to the previous page
    return null;
  }

  // Fetch products by seller ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${seller._id}`);

       // console.log('API Response:', response.data); // Debugging API response
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [seller._id]);
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src={seller.logo || '/placeholder.svg'}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{seller.name}</h1>
                <div className="text-gray-600">{seller.storeName}</div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{seller.address}</span>
                </div>
              </div>
            </div>
          
          </div>
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{seller.description}</p>
            {seller.socialLink && (
              <a
                href={seller.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Store's Social Link
              </a>
            )}
          </div>
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <div className="text-xl font-semibold">{products.length}</div>
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
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              onClick={() => handleProductClick(product._id)}
            >
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">${product.price.toFixed(2)}</span>
                  <button className="text-red-500 hover:text-red-600">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this seller.</p>
        )}
      </div>
    </div>
  );
};

export default SellerData;
