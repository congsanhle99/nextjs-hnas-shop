import Head from "next/head";
import Link from "next/link";
import styles from "../styles/404.module.scss";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, there is nothing to see here</p>

        <div className={styles.links}>
          <Link href="/">Home Page</Link>
          {/* <Link href="/latest" className={styles.link}>
            Latest Products
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact US
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
