import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

const List = ({ subCategories, setSubCategories }) => {
  return (
    <ul className={styles.list}>
      {subCategories.map((category) => (
        <ListItem category={category} setCategories={setCategories} key={category._id} />
      ))}
    </ul>
  );
};

export default List;
