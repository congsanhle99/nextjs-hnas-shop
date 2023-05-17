/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Sizes from "../../../../components/admin/createProduct/clickToAdd/Sizes";
import Colors from "../../../../components/admin/createProduct/colors";
import Images from "../../../../components/admin/createProduct/images";
import Style from "../../../../components/admin/createProduct/style";
import Layout from "../../../../components/admin/layout";
import AdminInput from "../../../../components/inputs/adminInput";
import MultipleSelect from "../../../../components/selects/MultipleSelect";
import SingularSelect from "../../../../components/selects/SingularSelect";
import Category from "../../../../models/Category";
import Product from "../../../../models/Product";
import styles from "../../../../styles/adminProduct.module.scss";
import db from "../../../../utils/db";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      name: "",
      value: "",
    },
  ],
  shippingFee: "",
};

const create = ({ parents, categories }) => {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getParentData = async () => {
      if (product.parent) {
        const { data } = await axios.get(`/api/product/${product.parent}`);
        console.log("data::::::", data);
        if (data) {
          setProduct({
            ...product,
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            subCategories: data.subCategories,
            questions: [],
            details: [],
          });
        }
      }
    };
    getParentData();
  }, [product.parent]);

  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get("/api/admin/subCategory", {
        params: {
          category: product.category,
        },
      });
      setSubs(data);
    }
    getSubs();
  }, [product.category]);

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name!")
      .min(10, "Product name must between 10 and 300 characters.")
      .max(300, "Product name must between 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand!"),
    category: Yup.string().required("Please select a category!"),
    subCategories: Yup.array().min(1, "Please select at least one sub Category!"),
    sku: Yup.string().required("Please add a sku/number!"),
    color: Yup.string().required("Please add a color!"),
    description: Yup.string().required("Please add a description!"),
  });
  const createProduct = async () => {};

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  console.log("product=== ", product);

  return (
    <Layout>
      <div className={styles.header}>Create Product</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInput: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />
            <div className={styles.flex}>
              {product.color.image && <img src={product.color.image} className={styles.image_span} alt="" />}
              {product.color.color && (
                <span className={styles.color_span} style={{ background: `${product.color.color}` }}></span>
              )}
            </div>
            <Colors name="color" product={product} setProduct={setProduct} colorImage={colorImage} />
            <Style name="styleInput" product={product} setProduct={setProduct} colorImage={colorImage} />
            <SingularSelect
              name="parent"
              value={product.parent}
              placeholder="Parent product"
              data={parents}
              header="Add to an existing product"
              handleChange={handleChange}
            />
            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              disabled={product.parent}
              handleChange={handleChange}
            />
            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Select Sub-Categories"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}
            <div className={styles.header}>Basic Infos</div>
            <AdminInput type="text" label="Name" name="name" placeholder="Product name" onChange={handleChange} />
            <AdminInput
              type="text"
              label="Description"
              name="description"
              placeholder="Product description"
              onChange={handleChange}
            />
            <AdminInput type="text" label="Brand" name="brand" placeholder="Product brand" onChange={handleChange} />
            <AdminInput type="text" label="Sku" name="sku" placeholder="Product sku/number" onChange={handleChange} />
            <AdminInput
              type="text"
              label="Discount"
              name="discount"
              placeholder="Product discount"
              onChange={handleChange}
            />
            <Sizes sizes={product.sizes} product={product} setProduct={setProduct} />
            {/* 
              <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescription_images}
              setColorImage={setColorImage}
            /> 
              <Details
              sizes = {product.details}
              product={product}
              setProduct={setProduct}
            /> 
              <Questions
              sizes = {product.questions}
              product={product}
              setProduct={setProduct}
            /> 
            */}
            <div className={styles.btnWrap}>
              <button type="submit" className={styles.btn}>
                <span> Create Product</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default create;

export async function getServerSideProps(context) {
  db.connectDb();
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();

  db.disconnectDb();

  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
