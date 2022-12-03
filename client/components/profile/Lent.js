import React, { useState, useEffect } from "react";
import { getMyLendings } from "../../redux/profile";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Error from "../Error";
import Card from "../profile/ProfileCard";

function Lent() {
  const dispatch = useDispatch();

  const { loading, myLendings } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getMyLendings());
  }, []);

  return (
    <>
      <div className="mainLendContainer">
        <div className="lendContainer">
          <h4>MY LENDINGS</h4>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : myLendings ? (
            myLendings.nft?.map((item) => (
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
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Lent;
