import React from "react";
import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import User from "../../../models/User";
import EnhancedTableHead from "../../../components/admin/users/table";

const users = ({ users }) => {
  return (
    <Layout>
      <EnhancedTableHead rows={users} />
    </Layout>
  );
};

export default users;

export async function getServerSideProps(context) {
  await db.connectDb();
  const users = await User.find({}).sort({ createAt: -1 }).lean();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
