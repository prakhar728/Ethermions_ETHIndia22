import React from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { useSelector } from "react-redux"

const LoanCard = ({ item, active }) => {
  const { walletAddress, instances } = useSelector((state) => state.navbar)
  // console.log(data)
  const { borrower_address, roi, repay, nftURI, whenBorrowed, proposalid } =
    item
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

  const repayProposal = async () => {
    const valueRequired = await instances.calculateAmountDue(proposalid)
    console.log(valueRequired)
    await (
      await instances.repayAll(proposalid, {
        value: valueRequired
      })
    ).wait()
  }

  const withdrawProposal = async () => {
    try {
      await (
        await instances.withDrawProposal(proposalid, {
          gasLimit: 1000000
        })
      ).wait()
      console.log("Withdrawn wuhu!")
    } catch (error) {
      console.log(error)
    }
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
        <div className="nftpricesele"> Matic</div>
        <div className="nftpricesele">{roi}% ROI</div>
        <div className="nftpricesele">{repay} Days</div>
      </div>

      <div className="nftpricesRow">
        <Link href={nftURI ? nftURI : "http"} target="_blank">
          <button className="btn btnSqr nftpricesele">View NFT</button>
        </Link>

        {active ? (
          (Date.now() / 1000 - whenBorrowed) / 86400 > repay ? (
            <button
              className="btn btnSqr nftpricesele"
              onClick={lendToProposal}
              disabled
            >
              Loan Defaulted
            </button>
          ) : (
            <button className="btn btnSqr" onClick={repayProposal}>
              Repay Loan
            </button>
          )
        ) : (
          <button className="btn btnSqr" onClick={withdrawProposal}>
            Withdraw
          </button>
        )}
      </div>
    </div>
  )
}

export default LoanCard
