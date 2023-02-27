/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import styles from "../styles/signin.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "../components/inputs/loginInput/LoginInput";
import CircleIconBtn from "../components/buttons/circleIconBtn/circleIconBtn";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
import DotLoader from "../components/loaders/dotLoader/DotLoader";
import Router from "next/router";
//
const initialValue = {
  // for login
  login_email: "",
  login_password: "",
  // for sign up
  name: "",
  email: "",
  password: "",
  conf_password: "",
  // sign up
  success: "",
  error: "",
};

const signin = ({ providers }) => {
  console.log("providers", providers);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValue);
  const { login_email, login_password, name, email, password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log("user", user);
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Please enter a valid email address.").email("Email Address is required."),
    login_password: Yup.string().required("Please enter a password."),
  });
  //
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What is your name ?")
      .min(2, "Name must have at least 2.")
      .matches(/^[aA-zZ]/, "Number and special characters are not allowed."),
    email: Yup.string().required("Please enter a valid email address.").email("Email Address is required."),
    password: Yup.string().required("Please enter a password.").min(6, "Password must least six characters"),
    conf_password: Yup.string()
      .required("Confirm password.")
      .oneOf([Yup.ref("password")], "Password must match."),
  });

  // call api to validate info user
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, success: data.message, error: "" });
      setLoading(false);
      setTimeout(() => {
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className={styles.login}>
        {/* login */}
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
                  <CircleIconBtn type="submit" text="Sign In" />
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                      <img src={`../../icons/${provider.id}.png`} alt="icons" />
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end login */}

        {/* register */}
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign Up</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => signUpHandler()}
            >
              {(form) => (
                <Form>
                  <LoginInput type="text" name="name" icon="user" placeholder="Full Name" onChange={handleChange} />
                  <LoginInput type="text" name="email" icon="email" placeholder="Email" onChange={handleChange} />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <CircleIconBtn type="submit" text="Sign Up" />
                </Form>
              )}
            </Formik>
            <div className={styles.register_success}>{success && <span>{success}</span>}</div>
            <div className={styles.register_error}>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
