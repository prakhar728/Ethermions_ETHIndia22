import React, { useState } from "react";
import styles from "../../styles/nftstack.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useAccount } from "wagmi";
import Card from "./Card";
import { RiAddBoxFill } from "react-icons/ri";
import Modal from "../Modal";
import TextInput from "../form/TextInput";
import { importNft } from "../../redux/borrow";
import { setSuccess } from "../../redux/success";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error";
import Loader from "../Loader";

const NFTStack = () => {
  const { address, isConnected } = useAccount();
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState({
    contractAddress: "",
    tokenId: "",
  });
  const dispatch = useDispatch();
  const nftList = useSelector((state) => state.borrow?.mynfts?.nft);
  const { loading } = useSelector((state) => state.borrow);
  console.log(nftList);
  const closeModal = () => {
    setIsModal(!isModal);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onSubmit = () => {
    console.log("submitted", data)

    dispatch(importNft(data))
      .unwrap()
      .then(() => dispatch(setSuccess("NFT imported Successfully!")));
  };

  return (
    <>
      {isModal ? (
        <Modal
          heading="Add NFT"
          closeModal={closeModal}
          onSubmit={onSubmit}
          loading={loading}
        >
          <Error />
          <TextInput
            name="contractAddress"
            title="Contract Address"
            type="text"
            placeholder="0x987..."
            handleChange={handleChange}
            value={data.contractAddress}
          />
          <TextInput
            name="tokenId"
            title="Token id"
            type="text"
            placeholder="0x987..."
            handleChange={handleChange}
            value={data.tokenId}
          />
        </Modal>
      ) : null}
      <div className={styles.Bcontainer}>
        <div className={styles.headerStack}>
          <h3 className={styles.header}>MY NFTs</h3>
          <AiOutlineInfoCircle />
        </div>
        <div className={styles.vault}>
          {isConnected ? (
            <>
              {nftList ? (
                nftList.map((item) => (
                  <div className={styles.vaultItem}>
                    <Card {...item} />
                  </div>
                ))
              ) : (
                <div className={styles.vaultItem}>
                  <Loader />
                </div>
              )}
              <div
                className={styles.vaultItem}
                onClick={() => setIsModal(!isModal)}
              >
                <div className="nftcardborrow ncbcenter">
                  <RiAddBoxFill
                    color="#434141"
                    size={150}
                    className="iconBorder"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>Please Connect your wallet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTStack;
