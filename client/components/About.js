import React from "react";
import Link from "next/link";
import styles from "../styles/about.module.css";

function About() {
  return (
    <div className={styles.aContainer}>
      <div className={styles.D}>
        <h4>Help</h4>
        <p>FAQ</p>
        <p>Discord</p>
      </div>
      <div className={styles.D}>
        <h4>NFTs</h4>
        <p>Collateral</p>
        <Link href="/profile/loans">
          <p>Loans</p>
        </Link>
        <Link href="/offer">
          <p>Offers</p>
        </Link>
      </div>
      <div className={styles.D}>
        <h4>About</h4>
        <p>Supports</p>
      </div>
      <div className={styles.D}>
        <h4>Account</h4>
        <Link href="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
}

export default About;
