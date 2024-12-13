import product from "../Model/product-schema.js"

export const getProducts = async(request,response) =>{
    try{
        const products = await product.find({});

        response.status(200).json(products);
    } catch(error){
        response.status(500).json({message : error.message});
    }
}


export const addProduct = async (req, res) => {
  try {
    const { title, description, category, sustainable, price, size, discount, quantity } = req.body;
    const image = req.file ? req.file.path : '';
     // Save image path if uploaded
    const sellerId=req.user.id;
    const newProduct = new product({
      id: new mongoose.Types.ObjectId().toString(), // Generate unique ID
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
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
