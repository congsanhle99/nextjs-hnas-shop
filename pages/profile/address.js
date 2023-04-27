/* eslint-disable react-hooks/rules-of-hooks */
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Shipping from "../../components/checkout/shipping";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import styles from "../../styles/profile.module.scss";

const index = ({ user, tab }) => {
  const [addresses, setAddresses] = useState(user.address.address);

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>
        <h1 className={styles.header__address}>Addresses</h1>
      </div>
      <Shipping user={user} addresses={addresses} setAddresses={setAddresses} profile />
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const address = await User.findById(session.user.id).select("address").lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
    },
  };
}
