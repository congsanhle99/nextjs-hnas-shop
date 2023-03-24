import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  try {
    db.connectDb();

    const id = req.query.id;
    const style = req.query.style;
    const size = req.query.size;

    const product = await Product.findById(id).lean();
    let discount = product.subProduct[style].discount;
    let priceBefore = product.subProduct[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    db.disconnectDb();

    return res.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProduct[style].sku,
      brand: product.brand,
      shipping: product.shipping,
      images: product.subProduct[style].images,
      color: product.subProduct[style].color,
      size: product.subProduct[style].sizes[size].size,
      price,
      priceBefore,
      quantity: product.subProduct[style].sizes[size].qty,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
