import React from "react"
import apenft from "../../assets/images/apenft.jpeg"
import { FaEthereum } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import { ethers } from "ethers"
import { useSelector } from "react-redux"

const NftCard = ({ data }) => {
  const { walletAddress, instances } = useSelector((state) => state.navbar)
  // console.log(data)
  const { amount, borrower_address, nftURI, proposalid, repay, roi } = data
  const lendToProposal = async () => {
    console.log("Starting to lend")
    console.log(ethers.utils.parseEther((amount / 1000).toString()))
    await (
      await instances.lendToProposal(proposalid, {
        value: ethers.utils.parseEther((amount / 1000).toString())
      })
    ).wait()
    console.log("Lent")
  }
  return (
    <div className="nftcard">
      <div className="nftcardHead">
        <div>
          <h3>Proposal #{proposalid}</h3>
          <h5>By {borrower_address}</h5>
        </div>
      </div>

      <div className="nftpricesRow">
        <div className="nftpricesele">{amount} Matic</div>
        <div className="nftpricesele">{roi}% ROI</div>
        <div className="nftpricesele">{repay} Days</div>
      </div>

      <div className="nftpricesRow">
        <Link
          href="https://testnets.opensea.io/assets/mumbai/0x440dae476c9ca1437fca4c142394b5d6ac2dfe88/6"
          target="_blank"
        >
          <button className="btn btnSqr nftpricesele">View NFT</button>
        </Link>
        <button className="btn btnSqr nftpricesele" onClick={lendToProposal}>
          Lend
        </button>
      </div>
    </div>
  )
}

export default NftCard
