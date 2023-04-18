import React from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

const Details = ({ details, product, setProduct }) => {
  const handleDetails = (idx, e) => {
    const values = [...details];
    values[idx][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };

  const handleRemove = (idx) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(idx, 1);
      setProduct({ ...product, details: values });
    }
  };

  return (
    <>
      <div className={styles.header}>Details</div>
      {details.length == 0 && (
        <div className={styles.details}>
          Add new Detail
          <BsFillPatchPlusFill
            className={styles.svg}
            onClick={() => {
              setProduct({
                ...product,
                details: [
                  ...details,
                  {
                    name: "",
                    value: "",
                  },
                ],
              });
            }}
          />
        </div>
      )}
      {details
        ? details.map((detail, idx) => (
            <div className={styles.clickToAdd} key={idx}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                min={1}
                value={detail.name}
                onChange={(e) => handleDetails(idx, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                min={1}
                value={detail.value}
                onChange={(e) => handleDetails(idx, e)}
              />

              <BsFillPatchMinusFill onClick={() => handleRemove(idx)} />
              <BsFillPatchPlusFill
                onClick={() => {
                  setProduct({
                    ...product,
                    details: [
                      ...details,
                      {
                        name: "",
                        value: "",
                      },
                    ],
                  });
                }}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default Details;
