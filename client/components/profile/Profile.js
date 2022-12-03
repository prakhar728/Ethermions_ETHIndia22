import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { FiEdit2 } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import profile from "../../assets/images/ApesNft.jpg";
import * as ethers from "ethers";
import { useState } from "react";

function Profile() {
  const { address } = useAccount();
  const [name, setName] = useState("");

  const provider = new ethers.getDefaultProvider(
    "https://eth-mainnet.g.alchemy.com/v2/_06u4FJJGukQ9HntHpYBKifzcfhOYu5x"
  );

  const ens = async () => {
    await provider
      .lookupAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
      .then((res) => {
        setName(res);
      });
  };

  ens();
  console.log(name);
  return (
    <>
      <div className="detailContainer">
        <Image src={profile} alt="" className="profileImage" />
        <div className="personal">
          <div className="nameaddress">
            {name === null || undefined ? <h2>Unnnamed</h2> : name}
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
