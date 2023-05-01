import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

const MaterialsFilter = ({ materials, materialHandler, replaceQuery }) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedMaterial = router.query.material || "";

  return (
    <div className={styles.filter}>
      <h3>
        Materials <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__materials}>
          {materials.map((material, idx) => {
            const check = replaceQuery("material", material);
            return (
              <label
                htmlFor={material}
                className={styles.filter__materials_material}
                key={idx}
                onClick={() => materialHandler(check.result)}
              >
                <input type="checkbox" name="material" id={material} checked={check.active} />
                <label htmlFor={material}>{material.length > 10 ? `${material.substring(0, 10)}...` : material}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaterialsFilter;
