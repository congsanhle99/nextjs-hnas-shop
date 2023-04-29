import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const MaterialsFilter = ({ materials }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Materials <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__materials}>
          {materials.map((material, idx) => (
            <div className={styles.filter__materials_material} key={idx}>
              <input type="checkbox" name="material" id={material} />
              <label htmlFor={material}>{material.length > 10 ? `${material.substring(0, 10)}...` : material}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsFilter;
