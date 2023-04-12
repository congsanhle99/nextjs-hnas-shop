import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../../selects/SingularSelect";

const Create = ({ categories, setSubCategories }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("SubCategory name is required!")
      .min(2, "SubCategory name must be between 2 and 100 characters.")
      .max(100, "SubCategory name must be between 2 and 100 characters.")
      .matches(/^[A-Za-z\s]*$/, "Number and special characters are not allowed!"),
    parent: Yup.string().required("Please choose a parent Category!"),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", { name, parent });
      setSubCategories(data.subCategory);
      setName("");
      setParent("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Sub-Category</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="subCategory name"
              onChange={(e) => setName(e.target.value)}
            />
            <SingularSelect
              name="parent"
              value={parent}
              data={categories}
              placeholder="Select Category"
              handleChange={(e) => setParent(e.target.value)}
            />
            {/* ${styles.btn__primary} */}
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add SubCategory</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Create;
