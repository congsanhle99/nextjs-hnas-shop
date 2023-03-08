import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: "User",
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },
  images: [],
  likes: [],
});
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: ObjectId,
      require: true,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    reviews: [reviewSchema],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    shipping: {
      type: Number,
      require: true,
      default: 0,
    },
    subProduct: [
      {
        images: [],
        description_image: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: String,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
