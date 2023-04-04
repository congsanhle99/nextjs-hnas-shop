import nc from "next-connect";
import auth from "../../../middleware/auth";
import User from "../../../models/User";
import db from "../../../utils/db";
const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    await user.updateOne(
      {
        $push: {
          address: address,
        },
      },
      { new: true }
    );
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
