import axios from "axios";
import { Form, Formik } from "formik";
import jwt from "jsonwebtoken";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";
import CircleIconBtn from "../../../components/buttons/circleIconBtn/circleIconBtn";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import LoginInput from "../../../components/inputs/loginInput/LoginInput";
import DotLoader from "../../../components/loaders/dotLoader/DotLoader";
import styles from "../../../styles/forgot.module.scss";

const Reset = ({ user_id }) => {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required(
        "Please enter a password. Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
      ),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Password must match."),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />
      <div className={styles.forgot}>
        <div className="">
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password ? <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm password"
                  onChange={(e) => setConf_password(e.target.value)}
                />
                <CircleIconBtn type="submit" text="Reset password" />
                <div style={{ marginTop: "16px" }}>{error && <span className={styles.error}>{error}</span>}</div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reset;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
