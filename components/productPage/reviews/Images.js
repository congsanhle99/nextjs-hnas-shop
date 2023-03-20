/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./styles.module.scss";

const Images = ({ images, setImages }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, idx) => {
      if (images.length == 4 || idx == 3) {
        setError("Max 3 images are allowed!");
        return;
      }
      if (
        img.type !== "image/png" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/jpg" &&
        img.type !== "image/webp"
      ) {
        setError(`${img.name} format is unsupported!`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is to large - 5Mb allowed!`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const removeImage = (image) => {
    setImages(images.filter((x) => x !== image));
  };
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />
      <button
        className={styles.login_btn}
        style={{ width: "150px", fontSize: "14px" }}
        onClick={() => inputRef.current.click()}
      >
        Add Images
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, idx) => (
            <span key={idx}>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
};

export default Images;
