import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import product from "../Model/product-schema.js"
import mongoose from "mongoose";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const fetchProducts = async(request,response) =>{
    try{
        const products = await product.find({});

        
        response.status(200).json({
          success:true,
          data:products,
        }
        
        
        );
        
    } catch(error){
        response.status(500).json({
          success:false,
          message:"error occured",
          error : error.message});
    }
}

//handleimage upload
export const handleImageUpload=async(req,res)=>{
  try{
   if (!req.file || !req.file.path) {
      return res.status(400).json({
          success: false,
          message: "No file uploaded",
      });
  }
  res.status(200).json({
    success: true,
    result: {
        url: req.file.path,
        public_id: req.file.filename, // Cloudinary's file ID
    },
});

  }catch(error){
    console.log("Image upload error: ",error);
    res.status(500).json({
      success:false,
      message:"Error while image uploading",
    })
  }
}

// fetch product by seller id

export const fetchSellerProducts = async (req, res) => {
  try {
    // Extract token from the request header
    

     const {sellerId}=req.params; 
    // Fetch products that belong to the seller
    const products = await product.find({ sellerId });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching seller products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller products",
      error: error.message,
    });
  }
};

//add new product
export const addProduct = async (req, res) => {
  try {
    const { title, description, category, sustainable, price, size, discount, quantity,image } = req.body;
     // Save image path if uploaded
     
     const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
 

    const decoded = jwt.verify(token, JWT_SECRET); // Decode token to get seller ID
    const sellerId = decoded.id;

    if (!title || !description || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Validate non-negative values
    if (price < 0 || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Price and Quantity must be non-negative values",
      });
    }
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Seller ID is missing",
      });
    }
    
    const newProduct = new product({
     // Generate unique ID
      title,
      description,
      category,
      sustainable,
      price,
      size,
      discount,
      quantity,
      sellerId,
      image,
    });

    await newProduct.save();
    res.status(201).json({ 
      success:true,
      message: "Product added successfully!", data: newProduct });
  } catch (error) {
    console.error('Error adding product:', error); // Log error
    res.status(500).json({ 
      success:false,
      error: error.message });
  }
};


//edit a product
export const editProduct = async (req, res) => {
  try{
    const {id}=req.params; //jo update karna h uski id
    const { title, description, category, sustainable, price, size, discount, quantity,image } = req.body;
 
     // Save image path if uploaded
    const findProduct=await product.findById(id);

    if(!findProduct) return res.status(404).json({
      success:false,
      message:"Product not found",
    });

    if (price !== undefined && price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a non-negative value",
      });
    }
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative value",
      });
    }

    findProduct.title=title || findProduct.title;

    findProduct.description=description || findProduct.description;

    findProduct.category=category || findProduct.category;

    findProduct.sustainable=sustainable || findProduct.sustainable;

    findProduct.price=price===''?0:price;

    findProduct.size=size || findProduct.size ;

    findProduct.discount=discount===''?0:discount;

    findProduct.quantity=quantity===''?0:quantity;

    findProduct.image=image 

    await findProduct.save();
    res.status(200).json({
      success:true,
      data:findProduct,
    })

  } catch (error) {
    res.status(500).json({ 
      success:false,
      error: error.message });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try{
    const {id}=req.params;
    const findProduct=await product.findByIdAndDelete(id);

    if(!findProduct) return res.status(404).json({
      success:false,
      message:"Product not found",
    });

    res.status(200).json({
      success:true,
      message:"Product deleted successfully",
    })


  } catch (error) {
    res.status(500).json({ 
      success:false,
      error: error.message });
  }
};
export const fetchProductById=async(request,response)=>{
  try {
    const { id } = request.params; 
   // console.log("Product id",id);
    const prod=await (await product.findById(id)).populate('sellerId','name email storeName phone address description socialLink logo');
    
    // console.log("Product Fetched:", prod); 
    if (!prod) {
      return response.status(404).json({
          success: false,
          message: "Product not found",
      });
  }

  response.status(200).json({
      success: true,
      data: prod,
  });

  } catch (error) {
    response.status(500).json({message:error.message})
  }
}
