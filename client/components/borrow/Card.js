import React, { useState } from "react";
import apenft from "../../assets/images/apenft.jpeg";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error";
import Loader from "../Loader";
import TextInput from "../form/TextInput";
import { borrowNft } from "../../redux/borrow";
import { setSuccess } from "../../redux/success";
import axios from "axios";
import { ethers } from "ethers";

const Card = ({ title, description, contract_address, token_id, status }) => {
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState({
    amount: 0,
    roi: 0,
    repay: 0,
  });
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModal(!isModal);
  };
  const { loading } = useSelector((state) => state.borrow);
  const { instances, signer } = useSelector((state) => state.navbar);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onSubmit = async () => {
    console.log("submitted");
    // dispatch(clearError())
    const sendData = {
      ...data,
      contract_address,
      token_id,
    };
    console.log(contract_address);
    axios
      .get(
        `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contract_address}&apikey=${process.env.API_KEY}`
      )
      .then(async (res) => {
        console.log("contract ABI", res?.data?.result);
        const contractABI = res?.data?.result;

        const currentContract = new ethers.Contract(
          contract_address,
          contractABI,
          signer
        );
        await await currentContract.approve(
          "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          token_id
        );
      })
      .catch((err) => {
        console.error("Permission", err);
      });

    try {
      await (
        await instances.startBorrowProposal(
          data.amount,
          data.roi,
          data.repay,
          contract_address,
          token_id,
          {
            gasLimit: 100000,
          }
        )
      ).wait();
    } catch (err) {
      console.log("Failed to start a proposal", err);
    }

    dispatch(borrowNft(sendData))
      .unwrap()
      .then((response) => {
        setIsModal(!isModal);
        dispatch(setSuccess("NFT listed Successfully!"));
      });
  };
  // console.log("in card comp", message)
  // console.log(data)
  return (
    <>
      {isModal ? (
        <Modal
          heading="Enter details to Borrow"
          closeModal={closeModal}
          onSubmit={onSubmit}
          loading={loading}
        >
          {/* <h3>{message}</h3> */}
          {<Error />}
          <TextInput
            name="amount"
            title="Loan Amount (in Matic)"
            type="number"
            placeholder="3"
            handleChange={handleChange}
            value={data.amount}
          />
          <TextInput
            name="roi"
            title="Rate of Interest"
            type="number"
            placeholder="12"
            handleChange={handleChange}
            value={data.roi}
          />
          <TextInput
            name="repay"
            title="Loan Period (in No. of Days)"
            type="number"
            placeholder="120"
            handleChange={handleChange}
            value={data.repay}
          />
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
            Borrow
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
