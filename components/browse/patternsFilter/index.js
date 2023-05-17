import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const PatternsFilter = ({ patterns, patternHandler, replaceQuery }) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedPattern = router.query.pattern || "";

  return (
    <div className={styles.filter}>
      <h3>
        Patterns <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__patterns}>
          {patterns.map((pattern, idx) => {
            const check = replaceQuery("pattern", pattern);
            return (
              <label
                htmlFor={pattern}
                className={styles.filter__patterns_pattern}
                key={idx}
                onClick={() => patternHandler(check.result)}
              >
                <input type="checkbox" name="pattern" id={pattern} checked={check.active} />
                <label htmlFor={pattern}>{pattern.length > 10 ? `${pattern.substring(0, 10)}...` : pattern}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PatternsFilter;
