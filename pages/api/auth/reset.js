import bcrypt from "bcrypt";
import nc from "next-connect";
import User from "../../../models/User";
import { connectDb, disconnectDb } from "../../../utils/db";
const handler = nc();

handler.put(async (req, res) => {
  try {
    await connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist." });
    }
    const cryptPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptPassword,
    });
    res.json({ email: user.email });
    await disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
