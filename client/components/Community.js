import styles from "../styles/community.module.css";
import { BsDiscord, BsTwitter, BsInstagram } from "react-icons/bs";

function Community() {
  return (
    <div className={styles.cContainer}>
      <h1>Join the Community</h1>
      <div className={styles.socioContainer}>
        <div className={styles.socio}>
          <BsDiscord size={100} style={{ backgroundColor: "#0e0d17" }} />
          <p className={styles.description}>
            Join our Discord and become a part of an amazing community. You will
            also find the ZaPP team there, ready to support you.
          </p>
        </div>
        <div className={styles.socio}>
          <BsTwitter size={100} style={{ backgroundColor: "#0e0d17" }} />
          <p className={styles.description}>
            Follow us on Twitter for updates on NFTs , NFT Finance and the NFT
            space in general only on ZaPP.
          </p>
        </div>
        <div className={styles.socio}>
          <BsInstagram size={100} style={{ backgroundColor: "#0e0d17" }} />
          <p className={styles.description}>
            Push the follow option on Instagram and be a part ZaPP, Stay
            tuned & Stay Updated, NFTs for life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Community;
