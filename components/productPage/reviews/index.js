import { Rating } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import AddReview from "./AddReview";
import Table from "./Table";
import styles from "./styles.module.scss";

const Reviews = ({ product }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState(product.reviews);

  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h2>Customer Reviews ({product.reviews?.length})</h2>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{ color: "#facf19" }}
              />
              {product.rating == 0 ? "Not review yet!" : `${product.rating} reviews`}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review} key={i}>
                <Rating name="half-rating-read" defaultValue={5 - i} readOnly style={{ color: "#facf19" }} />
                <div className={styles.bar}>
                  <div className={styles.bar__inner} style={{ width: `${rating.percentage}%` }}></div>
                </div>
                <span>{rating.percentage && isNaN(rating.percentage) ? 0 : rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} setReviews={setReviews} />
        ) : (
          <button className={styles.login_btn} onClick={() => signIn()}>
            Login to add review
          </button>
        )}
        <Table reviews={reviews} allSizes={product.allSizes} colors={product.colors} />
      </div>
    </div>
  );
};

export default Reviews;
