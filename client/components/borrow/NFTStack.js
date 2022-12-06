import React, { useState } from "react"
import styles from "../../styles/nftstack.module.css"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { useAccount } from "wagmi"
import Card from "./Card"
import { RiAddBoxFill } from "react-icons/ri"
import Modal from "../Modal"
import TextInput from "../form/TextInput"
import { importNft } from "../../redux/borrow"
import { setSuccess } from "../../redux/success"
import { useDispatch, useSelector } from "react-redux"
import Error from "../Error"
import Success from "../Success"
import Loader from "../Loader"
import axios from "axios"
import { ethers } from "ethers"

const NFTStack = () => {
  const { address, isConnected } = useAccount()
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState({
    contractAddress: "",
    tokenId: ""
  })
  const dispatch = useDispatch()
  const nftList = useSelector((state) => state.borrow?.mynfts?.nft)
  const { loading } = useSelector((state) => state.borrow)
  const { walletAddress } = useSelector((state) => state.navbar)
  console.log(nftList)
  const closeModal = () => {
    setIsModal(!isModal)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const onSubmit = () => {
    console.log("submitted", data)

    axios
      .get(
        `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${data.contractAddress}&apikey=${process.env.API_KEY_POLYGON}`
      )
      .then(async (resp1) => {
        const provider = ethers.getDefaultProvider(
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
        )
        const contractABI = await resp1.data.result
        const currentWallet = new ethers.Wallet(
          process.env.PRIVATE_KEY,
          provider
        )

        const currentContract = new ethers.Contract(
          data.contractAddress,
          contractABI,
          currentWallet
        )
        const ownerOfNft = await currentContract.ownerOf(data.tokenId)
        if (ownerOfNft != walletAddress) {
          console.error("The Owner can only call this function")
        } else {
          const tokenUri = await currentContract.tokenURI(data.tokenId)

          axios.get(tokenUri).then(async (res) => {
            console.log(res)
            axios
              .post(
                `${process.env.API_DOMAIN}/${data.contractAddress}/${walletAddress}/importNft`,
                {
                  title: res.data.name,
                  description: res.data.description,
                  image: res.data.image,
                  token_id: data.tokenId
                }
              )
              .then((res) => {
                console.log("Success Backend API Import", res)
              })
              .catch((err) => {
                console.log("Error while importing", err)
              })
          })
        }
      })

    // dispatch(importNft(data))
    //   .unwrap()
    //   .then(() => dispatch(setSuccess("NFT imported Successfully!")))
  }

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
        <Success />
      </div>
    </>
  )
}

export default NFTStack
