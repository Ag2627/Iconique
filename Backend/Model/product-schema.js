import mongoose from "mongoose";
//isse hum object ko validate karenge
const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Referencing the Seller model
        required: true,
    },
    image:String,
    title: {
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    size:String,
    sustainable:String,
    quantity:Number,
    category:String,
    description : String,
    discount : Number,
    tagline : String,
    averageReview:String
},{timestamps:true});

// Virtual field to calculate the final discounted price
productSchema.virtual('discountedPrice').get(function () {
    if (this.discount > 0) {
        return this.price - (this.price * this.discount / 100);
    }
    return this.price; // If no discount, return original price
});

// Include virtuals in JSON output
productSchema.set('toJSON', { virtuals: true });

//we have to create a collection in mongoose database
const product = mongoose.model('product',productSchema);
export default product;
