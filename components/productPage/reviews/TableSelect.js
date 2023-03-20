/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import styles from "./styles.module.scss";

const TableSelect = ({ property, text, data, handleChange }) => {
  const [visible, setVisible] = useState(false);
  // pass data from child to parent
  // Children
  // Pass the callback function to the child as a props: handleChange

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
          {text == "Rating" || text == "Size" || text == "Order" ? (
            property || `Select ${text}`
          ) : text == "Style" && property.image ? (
            <img src={property.image} alt="" />
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
            style={{
              width: text == "Order" && "180px",
            }}
          >
            {data.map((item, i) => {
              if (text == "Rating") {
                return (
                  <li key={i} onClick={() => handleChange(item.value)}>
                    <span>{item.text}</span>
                  </li>
                );
              }
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
                      {item.image ? <img src={item.image} alt="color" /> : "All Styles"}
                    </span>
                  </li>
                );
              }
              if (text == "Order") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item.value)}
                    style={{
                      width: text == "Order" && "180px",
                    }}
                  >
                    <span>{item.text}</span>
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

export default TableSelect;
