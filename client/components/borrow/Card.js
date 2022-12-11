import React, { useState } from "react"
import apenft from "../../assets/images/apenft.jpeg"
import Image from "next/image"
import Modal from "../Modal"
import { useDispatch, useSelector } from "react-redux"
import Error from "../Error"
import Loader from "../Loader"
import TextInput from "../form/TextInput"
import { borrowNft } from "../../redux/borrow"
import { setSuccess } from "../../redux/success"
import { setError } from "../../redux/error"
import axios from "axios"
import { ethers } from "ethers"

const Card = ({
  title,
  description,
  contract_address,
  token_id,
  status,
  image
}) => {
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState({
    amount: 0,
    roi: 0,
    repay: 0
  })
  const dispatch = useDispatch()
  const closeModal = () => {
    setIsModal(!isModal)
  }
  const { loading } = useSelector((state) => state.borrow)
  const { instances, signer, LB_contract_address } = useSelector(
    (state) => state.navbar
  )

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const onSubmit = async () => {
    console.log("submitted")
    // dispatch(clearError())
    const sendData = {
      ...data,
      contract_address,
      token_id
    }
    console.log(contract_address)
    axios
      .get(
        `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contract_address}&apikey=${process.env.API_KEY_POLYGON}`
      )
      .then(async (res) => {
        console.log("contract ABI", res?.data?.result)
        const contractABI = res?.data?.result

        const currentContract = new ethers.Contract(
          contract_address,
          contractABI,
          signer
        )
        console.log(
          (await currentContract.getApproved(token_id)) == LB_contract_address
        )
        if (
          (await currentContract.getApproved(token_id)) != LB_contract_address
        ) {
          console.log(token_id)
          console.log(
            "han idhar dekh",
            await currentContract.getApproved(token_id)
          )
          const currentGasPrice = await axios.get("https://gasstation-mainnet.matic.network/v2");
          console.log(currentGasPrice);
          let feeData = await signer.getGasPrice();
          console.log(feeData);
          await (
            await currentContract.approve(LB_contract_address, token_id,{
              maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
              maxFeePerGas: feeData["maxFeePerGas"]
            } )
          ).wait()
        }
        try {
          await (
            await instances.startBorrowProposal(
              data.amount,
              data.roi,
              data.repay,
              contract_address,
              token_id
            ,{
              gasLimit:10000000
            })
          ).wait()

          dispatch(borrowNft(sendData))
            .unwrap()
            .then((response) => {
              setIsModal(!isModal)
              dispatch(setSuccess("NFT listed Successfully!"))
            }).catch((err)=>{
              dispatch(setError("Request Failed, Please try again."))
            })
        } catch (err) {
          console.log("Failed to start a proposal", err)
        }
      })
      .catch((err) => {
        console.error("Permission", err)
      })
  }
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
            title="Loan Amount (in Wei)"
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
      <div className="nftcardborrownew">
        <div className="nftcardHead">
          <div>
            <h3>{title ? title : "NA"}</h3>
            <h5>#{token_id ? token_id : "NA"}</h5>
          </div>
        </div>
        <Image
          src={image ? image : apenft}
          className="nftImg"
          alt="nft-Image"
          width="250"
          height="250"
        />

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
  )
}

export default Card
