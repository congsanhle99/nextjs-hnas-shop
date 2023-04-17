/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { ErrorMessage, useField } from "formik";

const Style = ({ name, product, setProduct, colorImage, ...props }) => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [field, meta] = useField(props);

  const handleImages = (e) => {
    let img = e.target.files[0];
    if (
      img.type !== "image/png" &&
      img.type !== "image/jpeg" &&
      img.type !== "image/jpg" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsupported format",
          msgs: [
            {
              msg: `${img.name} format is unsupported! Only png,jpeg,jpg,webp are allowed.`,
              type: "error",
            },
          ],
        })
      );
      return;
    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "Image size is too large",
          msgs: [
            {
              msg: `${img.name} size is too large, maximum of 10MB allowed.`,
              type: "error",
            },
          ],
        })
      );
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: obj,
        });
      };
    }
  };

  return (
    <div className={styles.images}>
      <div className={`${styles.header} ${meta.error ? styles.header__error : ""}`}>
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/admin/warning.png" alt="" />}
          Pick a Product style image
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>

      <input
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleImages}
      />

      <button type="reset" onClick={() => fileInput.current.click()} className={`${styles.btn} ${styles.btn__primary}`}>
        Pick Style
      </button>
    </div>
  );
};

export default Style;
