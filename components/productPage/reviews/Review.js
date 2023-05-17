/* eslint-disable @next/next/no-img-element */
import { Rating } from "@mui/material";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import styles from "./styles.module.scss";

const Review = ({ review }) => {
  const { name, image } = review?.reviewBy;

  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>
            {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
          </h4>
          <img src={image} alt="" />
        </div>
        <div className={styles.review__review}>
          <Rating name="half-rating-read" defaultValue={review.rating} style={{ color: "#facf19" }} readOnly />
          <p>{review.review}</p>
          <p>
            <span>Overall Fit: </span>
            {review.fit}
            &nbsp;&nbsp;
            <span>Size: </span>
            {review.size}
            &nbsp;&nbsp;
            <div className={styles.flex}>
              <img src={review.style.image} className={styles.review__img} alt="" />
            </div>
          </p>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.review__images}>
          {review.images.length > 0 && review.images.map((img) => <img src={img?.url} alt="img review" key={img.id} />)}
        </div>
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike />
          </div>
          <div className={styles.review__extra_date}>{review?.updateAt?.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
