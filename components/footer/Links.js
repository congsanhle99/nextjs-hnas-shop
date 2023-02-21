/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const Links = () => {
  return (
    <div className={styles.footer__links}>
      {links.map((link, idx) => (
        <ul key={link.heading}>
          {idx === 0 ? <img src="../../../images/logo.png" alt="sub-logo" /> : <b>{link.heading}</b>}
          {link.links.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

const links = [
  {
    heading: "HNAS SHOP",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How to Order",
        link: "",
      },
      {
        name: "How to Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "CUSTOMER SERVICE",
    links: [
      {
        name: "Customer Service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];

export default Links;
