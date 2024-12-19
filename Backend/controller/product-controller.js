import product from "../Model/product-schema.js"

export const fetchProducts = async(request,response) =>{
    try{
        const products = await product.find({});

        response.status(200).json(products);
    } catch(error){
        response.status(500).json({message : error.message});
    }
}