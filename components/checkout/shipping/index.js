/* eslint-disable @next/next/no-img-element */
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import * as Yup from "yup";
import "yup-phone";
import { countries } from "../../../data/countries";
import { changeActiveAddress, saveAddress } from "../../../requests/user";
import ShippingInput from "../../inputs/shippingInput";
import SingularSelect from "../../selects/SingularSelect";
import styles from "./styles.module.scss";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

const Shipping = ({ selectedAddress, setSelectedAddress, user, addresses, setAddresses }) => {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  const { firstName, lastName, phoneNumber, state, city, zipCode, address1, address2, country } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be at least 3 characters long."),
    lastName: Yup.string().required("Last name is required.").min(3, "Last name must be at least 3 characters long."),
    phoneNumber: Yup.string().required("Phone number is required.").phone().min(10, "Phone number is not correct."),
    state: Yup.string().required("State is required.").min(2, "State must be at least 2 characters long."),
    city: Yup.string().required("City name is required.").min(3, "City name must be at least 3 characters long."),
    zipCode: Yup.string()
      .required("Zip code is required.")
      .min(6, "Zip code or Postal must be at least 6 characters long."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 must be at least 5 characters long."),
    address2: Yup.string().min(5, "Address Line 2 must be at least 5 characters long."),
    country: Yup.string().required("Country name is required."),
  });

  // func  insert input data in checkOut page
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses(res.addresses);
  };

  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };

  return (
    <div className={styles.shipping}>
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div
            className={`${styles.address} ${address.active && styles.active}`}
            key={address._id}
            onClick={() => changeActiveHandler(address._id)}
          >
            <h1>{address._id}</h1>
            <div className={styles.address__side}>
              <img src={user.image} alt="" />
            </div>
            <div className={styles.address__col}>
              <span>
                <FaIdCard />
                {address.firstName.toUpperCase()} {address.lastName.toUpperCase()}
              </span>
              <span>
                <GiPhone />
                {address.phoneNumber}
              </span>
            </div>

            <div className={styles.address__col}>
              <span>
                <FaMapMarkerAlt />
                {address.address1}
              </span>
              <span>{address.address2}</span>
              <span>
                {address.city}, {address.state}, {address.country}
              </span>
              <span>{address.zipCode}</span>
            </div>
            <span
              className={styles.active__text}
              style={{
                display: `${!address.active && "none"}`,
              }}
            >
              Active
            </span>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{ firstName, lastName, phoneNumber, state, city, zipCode, address1, address2, country }}
          validationSchema={validate}
          onSubmit={() => saveShippingHandler()}
        >
          {(formik) => (
            <Form>
              {/* Select country */}
              <SingularSelect
                name="country"
                value={country}
                placeholder="*Country"
                data={countries}
                handleChange={handleChange}
              />
              <div className={styles.col}>
                <ShippingInput name="firstName" placeholder="*First Name" onChange={handleChange} />
                <ShippingInput name="lastName" placeholder="*Last Name" onChange={handleChange} />
              </div>
              <div className={styles.col}>
                <ShippingInput name="state" placeholder="*State/Province" onChange={handleChange} />
                <ShippingInput name="city" placeholder="*City" onChange={handleChange} />
              </div>
              <ShippingInput name="phoneNumber" placeholder="*Phone Number" onChange={handleChange} />
              <ShippingInput name="zipCode" placeholder="*Post/Zip Code" onChange={handleChange} />
              <ShippingInput name="address1" placeholder="*Address Line 1" onChange={handleChange} />
              <ShippingInput name="address2" placeholder="Address Line 2" onChange={handleChange} />
              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Shipping;
