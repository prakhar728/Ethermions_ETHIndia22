import Link from "next/link"
import React, { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import NftCard from "../../components/lend/NftCard"
import { useDispatch, useSelector } from "react-redux"
import { getBorrowedNfts, selectNft } from "../../redux/lend"
import styles from "../../styles/nftstack.module.css"
import Loader from "../../components/Loader"

const data = {
  sno: "8071",
  name: "Bored ape",
  floorPrice: "61.39",
  valuation: "67.79"
}

const index = () => {
  const dispatch = useDispatch()
  const handleClick = (item) => {
    dispatch(selectNft(item))
  }

  const { walletAddress, instances } = useSelector((state) => state.navbar)
  useEffect(() => {
    console.log(walletAddress)
    // getAllNfts()
    dispatch(getBorrowedNfts())

  }, [])
  const mynfts = useSelector((state) => state?.lend?.mynfts)

  return (
    <Layout>
      <div className="lendpageContainer">
        <h1>Lend</h1>
        <h3>Offer loans to other users on their Non-Fungible Tokens</h3>
        <div className="lendContainer">
          
          {mynfts ? (
            mynfts.map((item, i) => {
              return (
                <div className="nftlistdiv" key={i}>
                  <Link
                    onClick={() => handleClick(item)}
                    href={`/lend/${item.token_id}`}
                  >
                    <NftCard data={item} />
                  </Link>
                </div>
              )
            })
          ) : (
            <div className={styles.vaultItem}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default index
