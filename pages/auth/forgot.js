import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";
import CircleIconBtn from "../../components/buttons/circleIconBtn/circleIconBtn";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import styles from "../../styles/forgot.module.scss";
import DotLoader from "../../components/loaders/dotLoader/DotLoader";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("aaaaaaaaaa");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setSuccess(data.message);
      setError("");
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      setSuccess("");
    }
  };
  const emailValidation = Yup.object({
    email: Yup.string().required("Please enter a valid email address.").email("Email is not in the correct format."),
  });
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
              Forgot your password ? <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CircleIconBtn type="submit" text="Send" />
                <div style={{ marginTop: "16px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
