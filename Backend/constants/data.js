import mongoose from 'mongoose';
// import dress from '../../src/assets/taylor_floral_dress.png';
export const products = [
  {
    _id:"product1",
    sellerId: "seller1",
    image: '../../src/assets/taylor_floral_dress.png',
    title: 'Taylor Swift Inspired - Vintage Floral Dress',
    price: 1499,  // Changed to a number
    size: 'M',
    sustainable: 'true',  // Remains as a string
    quantity: 1,
    description: "Inspired by Taylor Swift's iconic vintage style, this floral dress combines elegance with a touch of country charm. Perfect for casual outings or dressy occasions.",
    discount: 10,  // Changed to a number
    tagline: "Taylor’s Signature Look",
    averageReview: 'Stylish and comfortable',  // Renamed from review to averageReview
  },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/kanye-jacket.jpg',
  //   title: 'Kanye West Streetwear - Oversized Bomber Jacket',
  //   price: 3599,  // Changed to a number
  //   size: 'L',
  //   sustainable: 'false',  // Remains as a string
  //   quantity: 1,
  //   description: "Channel Kanye West's streetwear vibe with this oversized bomber jacket. Crafted for comfort and style, it’s ideal for urban fashion lovers who want to stand out.",
  //   discount: 15,  // Changed to a number
  //   tagline: 'Essentials for Kanye Fans',
  //   averageReview: 'High-quality material and comfortable',  // Renamed from review to averageReview
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/beyonce-glam-dress.jpg',
  //   title: 'Beyoncé Glamour - Sequined Bodycon Dress',
  //   price: 4499,  // Changed to a number
  //   size: 'S',
  //   sustainable: 'false',  // Remains as a string
  //   quantity: 1,
  //   description: "Step into the spotlight with a sequined bodycon dress inspired by Beyoncé's red-carpet looks. The perfect choice for parties and evening events.",
  //   discount: 10,  // Changed to a number
  //   tagline: "Queen Bey's Glam Picks",
  //   averageReview: 'Perfect for a glamorous look',  // Renamed from review to averageReview
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/rihanna-jumpsuit.jpg',
  //   title: 'Rihanna Bold Style - Casual Denim Jumpsuit',
  //   price: 2299,  // Changed to a number
  //   size: 'M',
  //   sustainable: 'true',  // Remains as a string
  //   quantity: 1,
  //   description: "Embrace Rihanna's bold and edgy style with this casual denim jumpsuit. Comfortable yet fashionable, it’s perfect for a standout streetwear look.",
  //   discount: 20,  // Changed to a number
  //   tagline: "Riri’s Street Style",
  //   averageReview: 'Unique design and comfortable',  // Renamed from review to averageReview
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/bieber-hoodie.jpg',
  //   title: 'Justin Bieber Vibes - Casual Oversized Hoodie',
  //   price: 1799,  // Changed to a number
  //   size: 'L',
  //   sustainable: 'true',  // Remains as a string
  //   quantity: 1,
  //   description: "Stay cozy and cool in this oversized hoodie inspired by Justin Bieber's casual style. Perfect for everyday wear and available in multiple colors.",
  //   discount: 5,  // Changed to a number
  //   tagline: "Bieber’s Laid-Back Style",
  //   averageReview: 'Very comfortable for everyday wear',  // Renamed from review to averageReview
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/ariana-coat.jpg',
  //   title: 'Ariana Grande Luxe - Elegant Faux Fur Coat',
  //   price: 3299,  // Changed to a number
  //   size: 'S',
  //   sustainable: 'true',  // Remains as a string
  //   quantity: 1,
  //   description: "Stay warm and chic with this faux fur coat inspired by Ariana Grande's glamorous style. Perfect for winter evenings or any time you want to turn heads.",
  //   discount: 10,  // Changed to a number
  //   tagline: "Ariana’s Luxe Picks",
  //   averageReview: 'Very warm and stylish',  // Renamed from review to averageReview
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   sellerId: new mongoose.Types.ObjectId(),
  //   image: 'https://example.com/drake-varsity-jacket.jpg',
  //   title: 'Drake Streetwear - Varsity Jacket',
  //   price: 2399,  // Changed to a number
  //   size: 'M',
  //   sustainable: 'false',  // Remains as a string
  //   quantity: 1,
  //   description: "This varsity jacket brings Drake's iconic street style into your wardrobe. Pair it with jeans or joggers for a versatile, everyday look.",
  //   discount: 20,  // Changed to a number
  //   tagline: "OVO Style Essentials",
  //   averageReview: 'Stylish and versatile',  // Renamed from review to averageReview
  // }
];
