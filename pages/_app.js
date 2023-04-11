import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../store";
import "../styles/globals.scss";

let persistor = persistStore(store);

// const initialOptions = {
//   "client-id": process.env.PAYPAL_CLIENT_ID,
//   currency: "USD",
//   intent: "capture",
//   // "data-client-token": "abc123xyz==",
// };

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>HnasShop</title>
        <meta name="description" content="Online shop for all of your need" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
              <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
