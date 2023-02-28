/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Form, Formik } from "formik";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";
import CircleIconBtn from "../components/buttons/circleIconBtn/circleIconBtn";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoginInput from "../components/inputs/loginInput/LoginInput";
import DotLoader from "../components/loaders/dotLoader/DotLoader";
import styles from "../styles/signin.module.scss";
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
  // sign in
  login_error: "",
};

const signin = ({ providers, csrfToken, callbackUrl }) => {
  console.log("providers", providers);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValue);
  const { login_email, login_password, name, email, password, conf_password, success, error, login_error } = user;

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

  // call api to validate register user
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
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className={styles.login}>
        {
          //#region login
        }
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
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input type="text" name="csrfToken" defaultValue={csrfToken} />
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
                  {login_error && <span className={styles.error}>{login_error}</span>}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                        <img src={`../../icons/${provider.id}.png`} alt="icons" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {
          //#endregion
        }

        {
          //#region register
        }
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
            <div className={styles.success}>{success && <span>{success}</span>}</div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
          </div>
        </div>
        {
          //#endregion
        }
      </div>
      <Footer />
    </>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const { req, query } = context;
  console.log("context".context);

  const session = await getSession({ req });
  console.log("session".session);
  const { callbackUrl } = query;
  console.log("callbackUrl".callbackUrl);

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}
