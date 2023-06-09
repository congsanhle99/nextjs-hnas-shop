/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ErrorMessage, useField } from "formik";
import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";
import styles from "./styles.module.scss";

const Colors = ({ name, product, setProduct, colorImage, ...props }) => {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField(props);

  const renderSwatches = () => {
    return colors.map((color, idx) => (
      <div
        className={styles.square__color}
        key={idx}
        style={{ backgroundColor: color }}
        onClick={() =>
          setProduct({
            ...product,
            color: { color, image: product.color.image },
          })
        }
      >
        {color}
      </div>
    ));
  };

  return (
    <div className={styles.colors}>
      <div className={`${styles.header} ${meta.error[name] ? styles.header__error : ""}`}>
        <div className={styles.flex}>
          {meta.error[name] && <img src="../../../images/admin/warning.png" alt="" />}
          Pick a product color
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

      <input type="text" value={product.color.color} name={name} hidden {...field} {...props} />
      <div className={styles.colors__infos}></div>
      <div className={toggle ? styles.toggle : ""}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} style={{ display: "none" }} />
        </ColorExtractor>
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {colors.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
    </div>
  );
};

export default Colors;
