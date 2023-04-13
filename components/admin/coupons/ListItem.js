import axios from "axios";
import React, { useRef, useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const ListItem = ({ coupon, setCoupons }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const inputRef = useRef(null);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/coupon", {
        data: { id },
      });
      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/coupon", {
        id,
        name: name || category.name,
      });
      setCoupons(data.coupons);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : coupon.coupon}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={inputRef}
      />
      <input
        className={open ? styles.open : ""}
        type="number"
        value={discount ? discount : discount.discount}
        onChange={(e) => setDiscount(e.target.value)}
        disabled={!open}
        ref={inputRef}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <button className={styles.btn} onClick={() => handleUpdate(coupon._id)}>
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
              setDiscount("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              inputRef.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(coupon._id)} />
      </div>
    </li>
  );
};

export default ListItem;
