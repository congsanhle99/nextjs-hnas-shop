import React from "react";
import ListItem from "./ListItem";
import styles from "./styles.module.scss";

const List = ({ categories, subCategories, setSubCategories }) => {
  return (
    <ul className={styles.list}>
      {subCategories &&
        subCategories.map((sub) => (
          <ListItem categories={categories} subCategory={sub} setSubCategories={setSubCategories} key={sub._id} />
        ))}
    </ul>
  );
};

export default List;
