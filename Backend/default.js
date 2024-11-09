import { products } from "./constants/data.js"
import product from "./Model/product-schema.js";
const DefaultData = async () => {
    try{
        //we used this to prevent from creating copies
        
        await product.insertMany(products);
        console.log('Data imported successfully')
    }
    catch(error){
        console.log('Error while inserting default data',error.message);
    }
}
export default DefaultData;