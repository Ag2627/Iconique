//frontend pe data ko show krne k liye ye file banayi h

import { products } from "./constants/data.js"
import product from "./Model/product-schema.js";
import Connection from "./Database/db.js";
const DefaultData = async () => {
    await Connection();
    try{
        //we used this to prevent from creating copies
        // await product.deleteMany({});
        // await product.insertMany(products);
        //console.log('Data imported successfully')
    }
    catch(error){
        console.log('Error while inserting default data',error.message);
    }
}
export default DefaultData;