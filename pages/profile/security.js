/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import * as Yup from "yup";
import CircleIconBtn from "../../components/buttons/circleIconBtn/circleIconBtn";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import Layout from "../../components/profile/layout";
import styles from "../../styles/profile.module.scss";

const index = ({ user, tab }) => {
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = Yup.object({
    current_password: Yup.string()
      .required("Please enter current password.")
      .min(8, "Password must least eight characters"),
    password: Yup.string().required("Please enter a new password.").min(8, "Password must least eight characters"),
    conf_password: Yup.string()
      .required("Confirm password.")
      .oneOf([Yup.ref("password")], "Password must match."),
  });

  const changePasswordHandler = async () => {
    try {
      const { data } = await axios.put("/api/user/changePassword", {
        current_password,
        password,
      });
      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Profile - Security</title>
      </Head>
      <Formik
        enableReinitialize
        initialValues={{
          current_password,
          password,
          conf_password,
        }}
        validationSchema={validate}
        onSubmit={() => {
          changePasswordHandler();
        }}
      >
        {(form) => (
          <Form>
            <LoginInput
              type="password"
              name="current_password"
              icon="password"
              placeholder="Current Password"
              onChange={(e) => setCurrent_password(e.target.value)}
            />
            <LoginInput
              type="password"
              name="password"
              icon="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="password"
              name="conf_password"
              icon="password"
              placeholder="Confirm Password"
              onChange={(e) => setConf_password(e.target.value)}
            />
            <CircleIconBtn type="submit" text="Change" />
            {error && <span className={styles.error}>{error}</span>}
            {success && <span className={styles.success}>{success}</span>}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  return {
    props: {
      user: session,
      tab,
    },
  };
}
