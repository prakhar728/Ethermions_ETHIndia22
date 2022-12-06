import React, { useState } from "react";
import apenft from "../../assets/images/apenft.jpeg";
import { FaEthereum } from "react-icons/fa";
import Modal from "../Modal";
import Image from "next/image";
import Link from "next/link";
import SiEthiopianairlines from "react-icons/si";
import { GiAtSea } from "react-icons/gi";
// import Error from "../Error";
// import Loader from "../Loader";

const ProfileCard = ({
  title,
  token_id,
  description,
  amount,
  repay,
  roi,
  contract_address,
  lender_address,
  borrower_address,
}) => {
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => {
    setIsModal(!isModal);
  };
  const onSubmit = () => {};
  return (
    <>
      {isModal ? (
        <Modal closeModal={closeModal} isBtn={false} heading="NFT Details">
          <div className="mainModalContainer">
            <div className="nftInfoContainer">
              <div className="nftImgContainer">
                <Image src={apenft} alt="" className="nftimg" />
              </div>
              <div className="nftContainer">
                <div className="ldInfoDiv">
                  <h4>
                    {title} #{token_id}
                  </h4>
                  <h4>{description}</h4>
                </div>
              </div>
            </div>
            <div className="ownerInfoContainer">
              <div className="detailContainer">
                <div className="ldInfoDiv">
                  <h2>NFT Information</h2>

                  <div className="ldTextDivs">
                    <div className="ldText">
                      <div className="ldTextbox">
                        <h5>Contract Address : {contract_address}</h5>
                      </div>
                      {lender_address ? (
                        <div className="ldTextbox">
                          <h5>Lender's Address : {lender_address}</h5>
                        </div>
                      ) : null}
                      <div className="ldTextbox">
                        <h5>Borrower's Address : {borrower_address}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="ldTextDivs">
                    <div className="ldText">
                      <div className="ldTextbox">
                        <h5>Rate Of Interest : {roi}%</h5>
                      </div>
                      <div className="ldTextbox">
                        <h5>Amount : {amount} mattic</h5>
                      </div>
                      <div className="ldTextbox">
                        <h5>Repayment Time : {repay} Days</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      <div className="nftcardborrow">
        <div className="nftcardHead">
          <div>
            <h3>{title ? title : "NA"}</h3>
            <h5>#{token_id ? token_id : "NA"}</h5>
          </div>
          <FaEthereum color="#9925ad" size={25} />
        </div>
        <Image src={apenft} className="nftImg" alt="nft-Image" />

        <div
          className="nftpricesRow"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <button className="btn btnSqr" onClick={() => setIsModal(!isModal)}>
            MORE...
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
