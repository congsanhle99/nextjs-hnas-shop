/* eslint-disable react/jsx-no-comment-textnodes */
import { Rating } from "@mui/material";
import React, { useState } from "react";
import Images from "./Images";
import Select from "./Select";
import styles from "./styles.module.scss";

const AddReview = ({ product }) => {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState([]);
  // pass data from child to parent
  // Parent:
  // Create callBack func
  const handleSize = (size) => {
    setSize(size);
  };
  //

  return (
    <div className={styles.reviews__add}>
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            property={size}
            text="Size"
            data={product.allSizes.filter((x) => x.size !== size)}
            handleChange={handleSize}
          />
          <Select
            property={style}
            text="Style"
            data={product.colors.filter((x) => x !== style)}
            handleChange={setStyle}
          />
          <Select property={fit} text="How does it fit" data={fits.filter((x) => x !== fit)} handleChange={setFit} />
        </div>
        {
          //#region add img for review
        }
        <Images images={images} setImages={setImages} />
        {
          //#endregion
        }
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />
        <button className={styles.login_btn}>Submit Review</button>
      </div>
    </div>
  );
};
let fits = ["Small", "True to size", "Large"];
export default AddReview;
