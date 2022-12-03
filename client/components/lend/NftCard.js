import React from "react";
import apenft from "../../assets/images/apenft.jpeg";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";

const NftCard = ({ data }) => {
  // console.log(data)
  const { title, token_id, description } = data;

  return (
    <div className="nftcard">
      <div className="nftcardHead">
        <div>
          <h3>{title}</h3>
          <h5>#{token_id}</h5>
        </div>
        <FaEthereum color="#9925ad" size={25} />
      </div>
      <Image src={apenft} className="nftImg" alt="nft-Image" />

      <div className="nftpricesRow">
        <div>
          {description}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
