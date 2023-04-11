import React from "react";
import styles from "../../../styles/dashboard.module.scss";
import Layout from "../../../components/admin/layout";
import { toast } from "react-toastify";

const dashboard = () => {
  return (
    <div>
      <Layout>
        <button onClick={() => toast.info("info")}>info</button>
        <button onClick={() => toast.success("success")}>success</button>
        <button onClick={() => toast.error("error")}>error</button>
      </Layout>
    </div>
  );
};

export default dashboard;
