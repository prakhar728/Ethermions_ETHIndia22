import React from "react";
import styles from "../styles/footer.module.css";
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import About from "./About";
function Footer() {
  return (
    <>
      <About />
      <div className={styles.fContainer}>
        <div className={styles.footer}>
          <div className={styles.conterms}>
            <li>Terms & Conditions</li>
            <li>Terms of use</li>
            <li>Privacy Policy</li>
          </div>
          <div className={styles.conterms}>
            <li>Made with 💖 by Team Ethermions</li>
          </div>
          <div className={styles.socialMedia}>
            <div>
              <FaDiscord size={35} className={styles.sicons} />
            </div>
            <div>
              <FaGithub size={35} className={styles.sicons} />
            </div>
            <div>
              <FaInstagram size={35} className={styles.sicons} />
            </div>
            <div>
              <FaTwitter size={35} className={styles.sicons} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
