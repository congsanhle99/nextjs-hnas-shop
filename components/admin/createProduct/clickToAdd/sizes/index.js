import React, { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { sizesList } from "../../../../../data/sizesList";
import styles from "./styles.module.scss";

const Sizes = ({ sizes, product, setProduct }) => {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (idx, e) => {
    const values = [...sizes];
    values[idx][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };
  const handleRemove = (idx) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(idx, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  return (
    <>
      <div className={styles.header}>Sizes / Quantity / Price</div>
      <button type="reset" className={styles.click_btn} onClick={() => setNoSize((prev) => !prev)}>
        {noSize ? "Click if Product has size " : "Click if Product has NO size"}
      </button>
      {sizes
        ? sizes.map((size, idx) => (
            <div className={styles.clickToAdd} key={idx}>
              <select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? "none" : ""}` }}
                onChange={(e) => handleSize(idx, e)}
              >
                <option value="">Select a size</option>
                {sizesList &&
                  sizesList.map((size, idx) => (
                    <option value={size} key={size}>
                      {size}
                    </option>
                  ))}
              </select>
              <input
                type="number"
                name="qty"
                placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                min={1}
                value={size.qty}
                onChange={(e) => handleSize(idx, e)}
              />
              <input
                type="number"
                name="price"
                placeholder={noSize ? "Product Price" : "Size Price"}
                min={1}
                value={size.price}
                onChange={(e) => handleSize(idx, e)}
              />
              {!noSize ? (
                <>
                  <BsFillPatchMinusFill onClick={() => handleRemove(idx)} />
                  <BsFillPatchPlusFill
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [
                          ...sizes,
                          {
                            size: "",
                            qty: "",
                            price: "",
                          },
                        ],
                      });
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </>
  );
};

export default Sizes;
