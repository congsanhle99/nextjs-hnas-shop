import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return response.data.error.message;
  }
};

export const saveAddress = async (address, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      user_id,
    });
    return data;
  } catch (error) {
    return response.data.error.message;
  }
};
