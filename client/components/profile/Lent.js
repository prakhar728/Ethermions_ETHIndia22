import React, { useState, useEffect } from "react"
import { getMyLendings } from "../../redux/profile"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Loader"
import Error from "../Error"
import Card from "../profile/ProfileCard"
import ListCard from './ListCard'

function Lent() {
  const dispatch = useDispatch()

  const { loading, myLendings } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getMyLendings())
  }, [])

  return (
    <>
      <div className="mainLoanContainer">
        <div className="loanContainer">
          <h4>MY LENDINGS</h4>
          <Error />
          {loading ? (
            <Loader />
          ) : myLendings ? (
            myLendings?.map((item) => (
              <div className="nftComponent">
                <ListCard
                  item = {item}
                />
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Lent
