import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { calculateDiff } from "./utils";

const remainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Countdown = ({ date }) => {
  const updateRemainingTime = (ms) => {
    setRemainingTime(calculateDiff(ms));
  };

  const [ms, setMs] = useState(date.getTime());
  useEffect(() => {
    setMs(date.getTime());
  }, [date]);

  const [remainingTime, setRemainingTime] = useState(remainingTime);
  console.log("remainingTime", remainingTime);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(ms);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ms]);

  return (
    <div className={styles.countdown}>
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => (
        <span key={i}>{remainingTime?.days.slice(i, i + 1)}</span>
      ))}
      <b>:</b>
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>

      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>

      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  );
};

export default Countdown;
