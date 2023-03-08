import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: [2, "Must be at least 2 characters"],
    maxLength: [32, "Max length is 32 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    require: true,
    ref: "Category",
  },
});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;
