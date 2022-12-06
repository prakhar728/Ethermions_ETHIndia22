import React, { useState, useEffect } from "react"
import Card from "../../components/profile/ProfileCard"
import { getListedForLoans, getActiveLoans } from "../../redux/profile"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Loader"
import Error from "../Error"
import LoanCard from "./LoanCard"

function Loan() {
  const dispatch = useDispatch()
  const [tab, setTab] = useState("Listed")

  const { loading, listedForLoans, activeLoans } = useSelector(
    (state) => state.profile
  )
  const { walletAddress, instances } = useSelector((state) => state.navbar)

  useEffect(() => {
    dispatch(getListedForLoans())
    dispatch(getActiveLoans())
  }, [])

  return (
    <>
      <div className="mainLoanContainer">
        <div className="loanContainer">
          <h4>ALL LOANS</h4>
          <div className="btnloanContainer">
            <button
              className="btn btnloan"
              onClick={() => setTab("Listed")}
              style={
                tab === "Listed"
                  ? { backgroundColor: "#9925ad", color: "white" }
                  : null
              }
            >
              Listed
            </button>
            <button
              className="btn btnloan"
              onClick={() => setTab("Active")}
              style={
                tab === "Active"
                  ? { backgroundColor: "#9925ad", color: "white" }
                  : null
              }
            >
              Active
            </button>
          </div>
        </div>
        <div className="loanDetailContainer">
          <Error />
          {tab === "Listed" ? (
            loading ? (
              <Loader />
            ) : listedForLoans ? (
              listedForLoans?.map((item, i) => (
                <div className="nftComponent" key={i}>
                  <LoanCard
                    item={item}
                    active={false}
                  />
                </div>
              ))
            ) : null
          ) : null}
          {tab === "Active" ? (
            loading ? (
              <Loader />
            ) : activeLoans ? (
              activeLoans?.map((item, i) => (
                <div className="nftComponent" key={i}>
                  <LoanCard
                    item={item}
                    active={true}
                  />
                </div>
              ))
            ) : null
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Loan
