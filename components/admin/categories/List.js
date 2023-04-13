import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

const List = ({ categories, setCategories }) => {
  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <ListItem category={category} setCategories={setCategories} key={category._id} />
      ))}
    </ul>
  );
};

export default List;
