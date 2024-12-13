import mongoose from "mongoose";
//isse hum object ko validate karenge
const productSchema = new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        required :true,//we did this to avoid copying of data in the database
        unique: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Referencing the Seller model
        required: true,
    },
    image:String,
    title: {
        type:Object,
        required:true,
    },
    price: Object,
    size:String,
    sustainable:String,
    quantity:Number,
    description : String,
    discount : String,
    tagline : String,
    averageReview:String
});
//we have to create a collection in mongoose database
const product = mongoose.model('product',productSchema);
export default product;