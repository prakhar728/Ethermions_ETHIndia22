import React from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { useSelector } from "react-redux"

const ListCard = ({ item }) => {
  const { walletAddress, instances } = useSelector((state) => state.navbar)
  // console.log(data)
  const {
    borrower_address,
    amount,
    roi,
    repay,
    proposalid,
    nftURI,
    whenBorrowed
  } = item
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
        <Link href={nftURI ? nftURI : "http"} target="_blank">
          <button className="btn btnSqr nftpricesele">View NFT</button>
        </Link>

        {(Date.now()/1000 - whenBorrowed) / 86400 > repay ? (
          <button className="btn btnSqr nftpricesele" onClick={lendToProposal}>
            Claim NFT 
          </button>
        ) : (
          <button className="btn btnSqr">
            {Math.floor(repay - (Date.now()/1000 - whenBorrowed) / 86400)} Days to claim
          </button>
        )}
      </div>
    </div>
  )
}

export default ListCard
