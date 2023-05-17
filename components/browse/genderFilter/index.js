import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const GenderFilter = ({ genderHandler }) => {
  const genders = ["Men", "Women", "Unisex"];
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Genders <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__genders}>
          {genders.map((gender, idx) => (
            <div className={styles.filter__genders_gender} key={idx} onClick={() => genderHandler(gender)}>
              <input type="checkbox" name="gender" id={gender} />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderFilter;
