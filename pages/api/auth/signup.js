import nc from "next-connect";
import { connectDb } from "../../../utils/db";
import { validationEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../../utils/token";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await connectDb();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    if (!validationEmail(email)) {
      return res.status(400).json({ message: "Invalid Email!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters!" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addUser._id.toString(),
    });
    console.log("activation_token", activation_token);
    res.send(activation_token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
