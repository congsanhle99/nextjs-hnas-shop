import nc from "next-connect";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
import User from "../../../models/User";
import db from "../../../utils/db";
import { sendMail } from "../../../utils/sendEmails";
import { createResetToken } from "../../../utils/token";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendMail(email, url, "", "Reset your password", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "An email has been sent to you, use it to reset password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
