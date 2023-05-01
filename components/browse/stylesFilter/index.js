import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const StylesFilter = ({ dataStyles, styleHandler, replaceQuery }) => {
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
          {dataStyles.map((style, idx) => {
            const check = replaceQuery("style", style);
            return (
              <label
                htmlFor={style}
                className={styles.filter__styles_style}
                key={idx}
                onClick={() => styleHandler(check.result)}
              >
                <input type="checkbox" name="style" id={style} checked={check.active} />
                <label htmlFor={style}>{style}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StylesFilter;
