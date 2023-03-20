/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import styles from "./styles.module.scss";

const Select = ({ property, text, data, handleChange }) => {
  const [visible, setVisible] = useState(false);
  // pass data from child to parent
  // Children
  // Pass the callback function to the child as a props: handleChange

  // data ???
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ padding: "0 5px", background: `${text == "Style" && property.color && `${property.color}`}` }}
      >
        <span className={`${styles.flex} ${styles.select__header_wrap}`}>
          {text == "Size" ? (
            property || `Select ${text}`
          ) : text == "Style" && property.image ? (
            <img src={property.image} alt="" />
          ) : text == "How does it fit" && property ? (
            property
          ) : !property && text == "How does it fit" ? (
            "How does it fit"
          ) : (
            "Select Style"
          )}
          <IoArrowDown />
        </span>
        {visible && (
          <ul
            className={styles.select__header_menu}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {data.map((item, i) => {
              if (text == "Size") {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
              // style
              if (text == "Style") {
                return (
                  <li key={i} onClick={() => handleChange(item)}>
                    <span style={{ background: `${item.color}` }}>
                      <img src={item.image} alt="color" />
                    </span>
                  </li>
                );
              }
              if (text == "How does it fit") {
                return (
                  <li key={i} onClick={() => handleChange(item)}>
                    <span>{item}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
