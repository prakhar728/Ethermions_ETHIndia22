import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { FiEdit2 } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import profile from "../../assets/images/ApesNft.jpg";

function Profile() {
  const { address } = useAccount();

  return (
    <>
      <div className="detailContainer">
        <Image src={profile} alt="" className="profileImage" />
        <div className="personal">
          <div className="nameaddress">
            <h2>Unnnamed</h2>
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
