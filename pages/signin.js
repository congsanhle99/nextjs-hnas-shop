/* eslint-disable @next/next/no-img-element */
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
import CircleIconBtn from "../components/buttons/circleIconBtn/circleIconBtn";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
//
const initialValue = {
  login_email: "",
  login_password: "",
};

const signin = ({ providers }) => {
  console.log("providers", providers);
  const [user, setUser] = useState(initialValue);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log("user", user);
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Please enter a valid email address.").email("Email Address is required."),
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
