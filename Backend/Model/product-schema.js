import mongoose from "mongoose";
//isse hum object ko validate karenge
const productSchema = new mongoose.Schema({
    id: {
        type:String,
        required :true,//we did this to avoid copying of data in the database
        unique: true
    },
    url: String,
    detailUrl:String,
    title: Object,
    price: Object,
    quantity:Number,
    description : String,
    discount : String,
    tagline : String

});
//we have to create a collection in mongoose database
const product = mongoose.model('product',productSchema);
export default product;