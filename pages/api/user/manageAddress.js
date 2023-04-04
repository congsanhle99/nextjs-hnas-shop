import nc from "next-connect";
import auth from "../../../middleware/auth";
import User from "../../../models/User";
import db from "../../../utils/db";
const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user);
    console.log("user___: ", user);
    let user_addresses = user.address;
    console.log("user_addresses: ", user_addresses);
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        console.log("if_user_addresses[i]: ", user_addresses[i]);
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        address: addresses,
      },
      { new: true }
    );
    db.disconnectDb();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
