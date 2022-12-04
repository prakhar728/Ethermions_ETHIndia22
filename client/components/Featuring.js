import React from "react";
import Image from "next/image";
import LottieCard from "./LottieCard";
import styles from "../styles/feature.module.css";
function Featuring() {
  return (
    <div className={styles.fContainer}>
      <div className={styles.bmain}>
        <div className="images">
          <LottieCard
            src="https://assets5.lottiefiles.com/packages/lf20_EVZQfwJW6o.json"
            style={{ zIndex: "5px" }}
            className="lottie"
          />
        </div>
        <div className={styles.content}>
          <h3>LENDERS</h3>
          <h2 className={styles.colored}>
          Recieve NFTs with add-on interest & no extra-charges
          </h2>
          <p className={styles.simple}>
          For the masses that have liquidity/crypto lying around and want to earn some interest over it, we have your back too. Research the NFTs available for collateralizing and give loans against them, who knows you might get a steal for an expensive gift.
          </p>
          <p className={styles.simple}>
            Yes, unlocking value from your NFT is that simple. What are you
            going to use the liquidity for? Earning yield on a money market?
            Completing your NFT collection? Treating yourself IRL?
          </p>
        </div>
      </div>
      <div className={styles.lmain}>
        <div className={styles.content}>
          <h3>Borrowers</h3>
          <div>
            <h2 className={styles.colored}>
              Get loans for your NFTs as collateral
            </h2>
          </div>
          <div>
            <p className={styles.simple}>
            Zapp aims to solve the problem of underlying assets that gain you no money. People often hold NFTs that grow at a very small rate over time, well what if they could get some loan against it and repay it back - making use of the money for instantaneous purposes as well as the value of NFT grows while being locked too.
            </p>
            <p className={styles.simple}>
              No matter if you loan to earn or loan to own, make sure you
              connect to the ZaPP expert lender community and deeply understand
              the NFTs you lend against.
            </p>
          </div>
        </div>
        <div className={styles.images}>
          <LottieCard
            src="https://assets5.lottiefiles.com/packages/lf20_3ysnvbux.json"
            style={{ zIndex: "5px" }}
            className="lottie"
          />
        </div>
      </div>
    </div>
  );
}

export default Featuring;
