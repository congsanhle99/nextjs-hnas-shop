import styleFunctionSx from "@mui/system/styleFunctionSx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const StylesFilter = ({ dataStyles, styleHandler }) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedStyle = router.query.style || "";

  return (
    <div className={styles.filter}>
      <h3>
        Styles <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__styles}>
          {dataStyles.map((style, idx) => (
            <div
              className={styles.filter__styles_style}
              key={idx}
              onClick={() => styleHandler(existedStyle ? `${existedStyle}_${styleFunctionSx}` : style)}
            >
              <input type="checkbox" name="style" id={style} />
              <label htmlFor={style}>{style}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StylesFilter;
