import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import styles from "./styles.module.scss";

const Create = () => {
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required!")
      .min(2, "Category name must be between 2 and 100 characters.")
      .max(100, "Category name must be between 2 and 100 characters.")
      .matches(/^[A-Za-z\s]*$/, "Number and special characters are not allowed!"),
  });

  const submitHandler = async () => {};

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            {/* ${styles.btn__primary} */}
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Category</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
