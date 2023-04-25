/* eslint-disable react/jsx-no-comment-textnodes */
import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogModal from "../../../components/dialogModal";
import { uploadImages } from "../../../requests/upload";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import Images from "./Images";
import Select from "./Select";
import styles from "./styles.module.scss";

const AddReview = ({ product, setReviews }) => {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  // pass data from child to parent
  // Parent:
  // Create callBack func
  const handleSize = (size) => {
    setSize(size);
  };
  //

  useEffect(() => {
    dispatch(hideDialog());
  });

  let uploaded_image = [];
  const handleSubmit = async () => {
    let msgs = [];
    if (!size) {
      msgs.push({
        msg: "Please select a size!",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Please select a style!",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Please select a fit!",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please add a review!",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Please select a rating!",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review error!",
          msgs,
        })
      );
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_image = await uploadImages(formData);
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploadImages,
      });

      setReviews(data.reviews);
      setSize("");
      setStyle("");
      setFit("");
      setRating("");
      setReview("");
      setImages([]);
    }
  };

  return (
    <div className={styles.reviews__add}>
      <DialogModal />
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
        <button className={styles.login_btn} onClick={() => handleSubmit()}>
          Submit Review
        </button>
      </div>
    </div>
  );
};
let fits = ["Small", "True to size", "Large"];
export default AddReview;
