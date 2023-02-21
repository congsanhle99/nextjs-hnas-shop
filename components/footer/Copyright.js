import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import { MdLocationOn } from "react-icons/md";

const Copyright = () => {
  return (
    <div className={styles.footer__copyright}>
      <section>@2023 HansShop All Rights Reserved.</section>
      <ul>
        {data.map((link) => (
          <li key={link.name}>
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
        <li>
          <a href="">
            <MdLocationOn /> VietNam
          </a>
        </li>
      </ul>
    </div>
  );
};

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Term & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];

export default Copyright;
