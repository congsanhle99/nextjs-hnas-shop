/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { notificationsData } from "../../../../data/notificationsData";
import styles from "./styles.module.scss";

const Notifications = ({ userImage }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.dropdown} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className={styles.dropdown__svg}>
        <IoNotificationsSharp />
      </div>
      <div className={`${styles.dropdown__content} ${show ? styles.active : ""} ${styles.scrollbar}`}>
        <div className={styles.dropdown__content_notifications}>
          {notificationsData.map((n, idx) => (
            <>
              {n.type == "order" ? (
                <div className={styles.dropdown__content_notifications_notification} key={idx}>
                  <img src={n.image} alt="" />
                  <p>
                    <span>{n.user}</span> has created a new order, total of {n.total}$
                  </p>
                </div>
              ) : (
                <div className={styles.dropdown__content_notifications_notification} key={idx}>
                  <img src={n.image} alt="" />
                  <span>{n.user}</span> new Account created!
                </div>
              )}
            </>
          ))}
        </div>
        <div className={styles.dropdown__content_footer}>
          <Link href="/admin/dashboard/notifications">See all notifications</Link>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
