/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const BrandsFilter = ({ brands, brandHandler }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__brands}>
          {brands.map((brand, idx) => (
            <button className={styles.filter__brands_brand} key={idx} onClick={() => brandHandler(brand)}>
              <img src={`../../../images/brands/${brand}.png`} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsFilter;
