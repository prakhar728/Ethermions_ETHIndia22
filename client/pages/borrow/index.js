import React, { useEffect } from "react"
import Layout from "../../components/Layout"
import Success from "../../components/Success"
import NFTStack from "../../components/borrow/NFTStack"
import { BsHddStack, BsStars } from "react-icons/bs"
import { AiOutlineThunderbolt } from "react-icons/ai"
import Link from "next/link"
import { getMyNfts } from "../../redux/borrow"
import { setSuccess } from "../../redux/success"
import { useDispatch, useSelector } from "react-redux"

const index = () => {
  const dispatch = useDispatch()

  const { walletAddress } = useSelector((state) => state.navbar)

  useEffect(() => {
    walletAddress ? dispatch(getMyNfts(walletAddress)) : null
  }, [])

  return (
    <Layout>
      <div className="borrowPageContainer">
        <div className="BContainer">
          <div className="btnContainer">
            <Link href="/mint" style={{ backgroundColor: "#330033" }}>
              <button className="btn-vault">Mint a NFT</button>
            </Link>
          </div>
          <div className="VComponent">
            <BsHddStack size={30} style={{ backgroundColor: "#330033" }} />
            <p>VAULTS ARE AIRDROP FRIENDLY</p>
          </div>
          <div className="VComponent">
            <BsStars size={30} style={{ backgroundColor: "#330033" }} />
            <p>ACCEPT COLLECTION-WIDE LOAN OFFERS.</p>
          </div>
          <div className="VComponent">
            <AiOutlineThunderbolt
              size={30}
              style={{ backgroundColor: "#330033" }}
            />
            <p>
              BUNDLE YOUR COLLATERAL FOR ONE LOAN. SAVE GAS ON LOAN EXTENSIONS.
            </p>
          </div>
        </div>
        <NFTStack />
      </div>
      <Success />
    </Layout>
  )
}

export default index
