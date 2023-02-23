/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "../components/inputs/loginInput/LoginInput";

const initialValue = {
  login_email: "",
  login_password: "",
};

const signin = () => {
  const [user, setUser] = useState(initialValue);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("name", [name]);
    console.log("value", value);
    setUser({ ...user, [name]: value });
  };
  console.log("user", user);
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Email Address is required.").email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign In</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default signin;
