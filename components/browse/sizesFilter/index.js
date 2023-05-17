import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Size from "./Size";

const SizesFilter = ({ sizes, sizeHandler }) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedSize = router.query.size || "";

  return (
    <div className={styles.filter}>
      <h3>
        Sizes <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {sizes.map((size, idx) => (
            <div onClick={() => sizeHandler(existedSize ? `${existedSize}_${size}` : size)} key={idx}>
              <Size size={size} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizesFilter;
