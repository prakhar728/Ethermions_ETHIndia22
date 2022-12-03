import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { FiEdit2 } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import profile from "../../assets/images/ApesNft.jpg";
import * as ethers from "ethers";

function Profile() {
  const { address } = useAccount();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/_06u4FJJGukQ9HntHpYBKifzcfhOYu5x"
  );
  // .lookupAddress("0x2c2148C9995A94Cf3c4365B19125027B5b94c51D")
  const ens = async () => {
    await provider.resolveName("vitalik.eth").then((res) => {
      console.log(res);
    });
  };

  const name = ens();
  console.log(name);

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
