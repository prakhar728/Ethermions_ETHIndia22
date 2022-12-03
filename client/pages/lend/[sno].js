import React from "react";
import Image from "next/image";
import apenft from "../../assets/images/apenft.jpeg";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaEthereum } from "react-icons/fa";
import { SiEthiopianairlines } from "react-icons/si";
import { GiAtSea } from "react-icons/gi";
import Link from "next/link";
import { lendNft } from "../../redux/lend";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Success from "../../components/Success";
import { setSuccess } from "../../redux/success";

const sno = () => {
  const { nftDetails } = useSelector((state) => state.lend || {});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lend);

  if(!nftDetails)return;
  const {
    title,
    token_id,
    roi,
    amount,
    repay,
    description,
    contract_address,
    wallet_address,
  } = nftDetails;
  // console.log(nftDetails)

  const onSubmit = () => {
    console.log("submitted");
    // dispatch(clearError())
    const sendData = {
      ...nftDetails,
      contract_address: contract_address,
      wallet_address: wallet_address,
    };

    dispatch(lendNft(sendData)).unwrap().then((response) => {
      dispatch(setSuccess("NFT Lent Successfully!"))
    })
  };

  return (
    <Layout>
      <div className="ldContainer">
        <Error />
        <div className="ldFirstDiv">
          <div className="ldImgDiv">
            <Image
              src={apenft}
              alt="nftImg"
              width="320"
              height="320"
              className="ldImg"
            />
            <div className="ldlinks">
              <Link href="https://etherscan.io/">
                <SiEthiopianairlines size={25} className="ldIcons" />
              </Link>
              <Link href="https://opensea.io/">
                <GiAtSea size={25} className="ldIcons" />
              </Link>
            </div>
          </div>
          <div className="ldInfoDiv">
            <h2>NFT Information</h2>
            <h4>
              {title} #{token_id}
            </h4>
            <h4>{description}</h4>
          </div>
          {/* <div className="ldInfoDiv">
            <h2>Owner Information</h2>
            <h4>{name}</h4>
            <div className="ldTextDivs">
              <div className="ldText">
                <div className="ldTextbox">
                  <h5>Total Borrowed</h5>
                  <div>
                    <FaEthereum size={15} />
                    {54.46} wETH
                  </div>
                </div>
                <div className="ldTextbox">
                  <h5>Avg Borrowed</h5>
                  <div>
                    <FaEthereum size={15} />
                    {1.48572} wETH
                  </div>
                </div>
              </div>
              <div className="ldText">
                <div className="ldTextbox">
                  <h5>Total Lent</h5>
                  <div>
                    <FaEthereum size={15} />
                    {0} wETH
                  </div>
                </div>
                <div className="ldTextbox">
                  <h5>Avg loan size</h5>
                  <div>
                    <FaEthereum size={15} />
                    {0} wETH
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="ldInfoDiv">
            <h2>NFT Information</h2>
            <h4>
              {name} #{sno}
            </h4>
            <div className="ldTextDivs">
              <div className="ldText">
                <div className="ldTextbox">
                  <h5>Floor Price</h5>
                  <div>
                    <FaEthereum size={15} />
                    {floorPrice}
                  </div>
                </div>
                <div className="ldTextbox">
                  <h5>Valuation</h5>
                  <div>
                    <FaEthereum size={15} />
                    {valuation}
                  </div>
                </div>
              </div>
              <div className="ldText">
                <div className="ldTextbox">
                  <h5>Floor Price</h5>
                  <div>
                    <FaEthereum size={15} />
                    {floorPrice}
                  </div>
                </div>
                <div className="ldTextbox">
                  <h5>Valuation</h5>
                  <div>
                    <FaEthereum size={15} />
                    {valuation}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="ldSecondDiv">
          {/* <div className="ldPaymentBox"> */}
          <h3>Lend amount</h3>
          <div className="ldTextbox">
            <h5>Loan Duration</h5>
            <div>{repay} Days</div>
          </div>
          <div className="ldTextbox">
            <h5>APR</h5>
            <div>{roi}%</div>
          </div>
          <div className="ldTextbox">
            <h5>Amount</h5>
            <div>{amount} Matic</div>
          </div>
          <div>
            <button className="btn ldbtn" onClick={loading ? null : onSubmit}>
              {loading ? <Loader height="20" width="20" /> : "LEND"}
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>
      <Success/>
    </Layout>
  );
};

export default sno;
