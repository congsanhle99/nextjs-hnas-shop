import { getSession } from "next-auth/react";
import React from "react";
import Layout from "../../components/profile/layout";

const index = ({ user, tab }) => {
  return (
    <Layout session={user.user} tab={tab}>
      index
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
