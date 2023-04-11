import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import styles from "./styles.module.scss";

const Create = () => {
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string(),
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
            <button type="submit" className={`${styles.btn} ${styles.btn__primary}`}>
              <span>Add Category</span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
