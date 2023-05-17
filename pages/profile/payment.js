/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Payment from "../../components/checkout/payment";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import styles from "../../styles/profile.module.scss";

const index = ({ user, tab, defaultPaymentMethod }) => {
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [dbPM, setDbPM] = useState(defaultPaymentMethod);
  const [error, setError] = useState("");

  const handlePM = async () => {
    try {
      const { data } = await axios.put("/api/user/changePM", {
        paymentMethod,
      });
      setError("");
      setDbPM(data.paymentMethod);
      // False: Reload the current resources from the browser's cache
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>
        <h1>My Payment Methods</h1>
      </div>
      <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} profile />
      <div className={styles.wrap}>
        <button
          className={`${styles.button} ${!paymentMethod || paymentMethod == dbPM ? styles.disabled : ""}`}
          disabled={!paymentMethod || paymentMethod == dbPM}
          onClick={() => handlePM()}
        >
          Save
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const user = await User.findById(session.user.id).select("defaultPaymentMethod");

  return {
    props: {
      user: session,
      tab,
      defaultPaymentMethod: user.defaultPaymentMethod,
    },
  };
}
