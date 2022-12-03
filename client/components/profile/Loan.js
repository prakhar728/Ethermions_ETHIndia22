import React, { useState, useEffect } from "react";
import Card from "../../components/profile/ProfileCard";
import { getListedForLoans, getActiveLoans } from "../../redux/profile";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Error from "../Error";

function Loan() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Listed");

  const { loading, listedForLoans, activeLoans } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getListedForLoans());
    dispatch(getActiveLoans());
  }, []);

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
              listedForLoans.nft?.map((item) => (
                <div className="nftComponent">
                  <Card
                    lender_address={item.lender_address}
                    borrower_address={item.borrower_address}
                    amount={item.amount}
                    contract_address={item.contract_address}
                    repay={item.repay}
                    roi={item.roi}
                    description={item.description}
                    title={item.title}
                    token_id={item.token_id}
                  />
                </div>
              ))
            ) : null
          ) : null}
          {tab === "Active" ? (
            loading ? (
              <Loader />
            ) : activeLoans ? (
              activeLoans.nft?.map((item) => (
                <div className="nftComponent">
                  <Card
                    lender_address={item.lender_address}
                    borrower_address={item.borrower_address}
                    amount={item.amount}
                    contract_address={item.contract_address}
                    repay={item.repay}
                    roi={item.roi}
                    description={item.description}
                    title={item.title}
                    token_id={item.token_id}
                  />
                </div>
              ))
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Loan;
