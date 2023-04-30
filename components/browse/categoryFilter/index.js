import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Card from "./Card";

const CategoryFilter = ({ categories, subCategories, categoryHandler }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show &&
        categories.map((category, idx) => (
          <Card category={category} subCategories={subCategories} categoryHandler={categoryHandler} key={idx} />
        ))}
    </div>
  );
};

export default CategoryFilter;
