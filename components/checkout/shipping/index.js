import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "yup-phone";
import { countries } from "../../../data/countries";
import { saveAddress } from "../../../requests/user";
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

const Shipping = ({ user, selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [shipping, setShipping] = useState(initialValues);
  const { firstName, lastName, phoneNumber, state, city, zipCode, address1, address2, country } = shipping;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    const res = await saveAddress(shipping, user._id);
    setAddresses([...addresses, res]);
    setSelectedAddress(res);
  };

  return (
    <div className={styles.shipping}>
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
    </div>
  );
};

export default Shipping;
