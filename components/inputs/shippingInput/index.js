import { ErrorMessage, useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const ShippingInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  // field
  // name: "firstName"
  // onBlur: ƒ ()
  // onChange: ƒ ()
  // value: ""

  // meta
  // error: undefined;
  // initialError: undefined;
  // initialTouched: false;
  // initialValue: "";
  // touched: false;
  // value: "";

  const [move, setMove] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (field.value.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div className={`${styles.input} ${meta.touched && meta.error && styles.error}`}>
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field.value.length > 0 ? true : false)}
      >
        <input type={field.type} name={field.name} {...field} {...props} ref={inputRef} />
        <span
          className={move ? styles.move : ""}
          onClick={() => {
            inputRef.current.focus();
            setMove(true);
          }}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
};

export default ShippingInput;
