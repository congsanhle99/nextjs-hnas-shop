import nc from "next-connect";
import slugify from "slugify";
import auth from "../../../middleware/auth";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import db from "../../../utils/db";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res.status(400).json({ message: "Sub-Category already exist, Try a different name!" });
    }

    await new SubCategory({ name, parent, slug: slugify(name) }).save();
    db.disconnectDb();
    res.json({
      message: `Sub-Category ${name} has been created successfully!`,
      subCategory: await SubCategory.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();
    await Category.findByIdAndRemove(id);
    db.disconnectDb();

    return res.json({
      message: `Category has been deleted successfully!`,
      categories: await Category.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    db.connectDb();
    await Category.findByIdAndUpdate(id, { name });
    db.disconnectDb();

    return res.json({
      message: `Category has been updated successfully!`,
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
