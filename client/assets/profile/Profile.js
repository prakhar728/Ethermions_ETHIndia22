import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { FiEdit2 } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import profile from "../../assets/images/ApesNft.jpg";
import * as ethers from "ethers";
import { useState } from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import apenft from "../../assets/images/apenft.jpeg";

function Profile() {
  const { address } = useAccount();
  const [name, setName] = useState("");
  const [avtr, setAvtr] = useState("");

    const { ensName, ensImg } = useSelector(state=>state.ens)

  return (
    <>
      <div className="detailContainer">
          <Image
            src={ensImg?ensImg:apenft}
            alt=""
            className="profileImage"
            width={200}
            height={200}
          />
        <div className="personal">
          <div className="nameaddress">
            {ensName === null || undefined ? <h2>Unnnamed</h2> : ensName}
            <h5>
              {address?.slice(0, 7)}....{address?.slice(32, 37)}
            </h5>
          </div>
          <div className="nameicon">
            <FiEdit2 size={18} className="icons" />
            <BsShare size={18} className="icons" />
          </div>
        </div>
      </div>
      <div className="countDetails">
        <div className="counts">Borrowed: </div>
        <div className="counts">Lent: </div>
        <div className="counts">Repayment ratio: </div>
      </div>
    </>
  );
}

export default Profile;
