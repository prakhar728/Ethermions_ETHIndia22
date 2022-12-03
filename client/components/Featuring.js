import React from "react";
import Image from "next/image";
import bgImg1 from "../assets/images/bgImg1.gif";
import bgImg2 from "../assets/images/bgImg2.gif";
import styles from "../styles/feature.module.css";
import LottieCard from "./LottieCard";

function Featuring() {
  return (
    <div className={styles.fContainer}>
      <div className={styles.bmain}>
        <div className="images">
          <LottieCard src="https://assets5.lottiefiles.com/packages/lf20_EVZQfwJW6o.json" />
        </div>
        <div className={styles.content}>
          <h3>Borrows</h3>
          <h2 className={styles.colored}>
            Recieve NFTs with add-on interest & no extra-charges
          </h2>
          <p className={styles.simple}>
            List your NFT as collateral and get loan offers from our users. Once
            you accept an offer, you receive MATIC liquidity from the lenders
            wallet into yours. Your NFT gets transferred into a double-audited
            escrow smart contract for the loan duration. Repay the loan before
            it expires, and you get your NFT back. If you default, the lender
            can foreclose and receive your NFT. There are no auto-liquidations
            on ZaPP.
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
          <h3>Lends</h3>
          <div>
            <h2 className={styles.colored}>
              Get returns or an NFT at a damn good rates
            </h2>
          </div>
          <div>
            <p className={styles.simple}>
              Browse over 150 NFT collections (including CryptoPunks, Bored
              Apes, Art Blocks, Mutant Apes, VeeFriends, Autoglyphs, and most
              other bluechips) and offer loans on the assets you’re happy to
              back.
            </p>
            <p className={styles.simple}>
              Best case, you earn a juicy APR. Worst case, the borrower defaults
              and you walk away with an NFT at a hefty discount. Some lenders
              even specialize in loan-to-own strategies.
            </p>
            <p className={styles.simple}>
              No matter if you loan to earn or loan to own, make sure you
              connect to the ZaPP expert lender community and deeply understand
              the NFTs you lend against.
            </p>
          </div>
        </div>
        <div className={styles.images}>
          <LottieCard src="https://assets5.lottiefiles.com/packages/lf20_3ysnvbux.json" />
        </div>
      </div>
    </div>
  );
}

export default Featuring;
