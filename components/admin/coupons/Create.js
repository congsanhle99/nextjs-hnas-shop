import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import axios from "axios";

const Create = ({ setCoupons }) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const validate = Yup.object({
    name: Yup.string()
      .required("Coupon name is required!")
      .min(8, "Coupon name must be between 8 and 30 characters.")
      .max(30, "Coupon name must be between 8 and 30 characters.")
      .matches(/^[a-zA-Z0-9]*$/g, "Special characters are not allowed!"),

    discount: Yup.number()
      .required("Discount is required!")
      .min(1, "Discount must be at least 1%")
      .max(99, "Discount must be 99% or less"),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/coupon", { name });
      setCoupons(data.coupons);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Coupon</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Coupon name"
              onChange={(e) => setName(e.target.value)}
            />
            <AdminInput
              type="number"
              label="Discount"
              name="discount"
              placeholder="Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
            {/* ${styles.btn__primary} */}
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Coupon</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
