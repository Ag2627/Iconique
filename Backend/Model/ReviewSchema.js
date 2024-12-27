
import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
      },
    userName: String,
    reviewMessage: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
     
}, { timestamps: true });
const review = mongoose.model('ProductReview',ProductReviewSchema);
export default review;