import { Rating } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import AddReview from "./AddReview";
import styles from "./styles.module.scss";
import Table from "./Table";

const Review = ({ product }) => {
  const { data: session } = useSession();
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
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} />
        ) : (
          <button className={styles.login_btn} onClick={() => signIn()}>
            Login to add review
          </button>
        )}
        <Table reviews={product.reviews} allSizes={product.allSizes} colors={product.colors} />
      </div>
    </div>
  );
};

export default Review;
