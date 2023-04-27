import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import slugify from "slugify";
import styles from "./styles.module.scss";

const Item = ({ item, visible, index }) => {
  const [show, setShow] = useState(visible);
  const router = useRouter();

  return (
    <li>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign Out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, idx) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") == slugify(link.name, { lower: true }) ? styles.active : ""
                  }
                  key={link.name}
                >
                  <Link href={`${link.link}?tab=${index}&q=${slugify(link.name, { lower: true })}__${link.filter}`}>
                    <a>{link.name}</a>
                  </Link>
                </li>
              ) : (
                <li
                  className={(router.query.q || "") == slugify(link.name, { lower: true }) ? styles.active : ""}
                  key={link.name}
                >
                  <Link href={`${link.link}?tab=${index}&q=${slugify(link.name, { lower: true })}`}>
                    <a>{link.name}</a>
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Item;
