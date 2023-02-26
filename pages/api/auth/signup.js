import nc from "next-connect";
import { connectDb } from "../../../utils/db";
import { validationEmail } from "../../../utils/validation";
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
