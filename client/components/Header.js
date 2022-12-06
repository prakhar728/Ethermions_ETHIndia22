import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectionButton, navbarList } from "./Header.data";
import { FaUser } from "react-icons/fa";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { useAccount, useSigner } from "wagmi";
// Assets imports
import logo from "../assets/images/logo.png";
// redux imports
import {
  changeNavbarState,
  saveAddressAndSigner,
  addContractAddresses,
} from "../redux/navbar";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import abi from "../assets/contractsData/LenderBorrower.json";
import LB_contract_address from "../assets/contractsData/LenderBorrower-address.json";
import nft_contract_address from "../assets/contractsData/ZD-address.json";
import { getEnsName } from "../redux/ens";

const Header = () => {
  const dispatch = useDispatch();
  const [addressfinal, setAddressfinal] = useState(null);
  const { navbarMobile } = useSelector((state) => state.navbar);
  const { ensName } = useSelector((state) => state.ens);
  const router = useRouter();
  const urlpath = router.pathname;
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const instances = new ethers.Contract(
    LB_contract_address.address,
    abi.abi,
    signer
  );

  useEffect(() => {
    setAddressfinal(address);
    dispatch(
      addContractAddresses({
        LB_contract_address: LB_contract_address.address,
        nft_contract_address: nft_contract_address.address,
      })
    );
    address && signer
      ? dispatch(saveAddressAndSigner({ address, signer, instances }))
      : null;
    // address ? dispatch(getEnsName(address, signer?.provider)) : null
    const func = async () => {
      const provider = new ethers.getDefaultProvider(
        "https://eth-mainnet.g.alchemy.com/v2/iTHRdl4nF5g4DGVs8W8mqUyCfiTxn0Tc"
      );
      // var name = await provider.lookupAddress(address)
      dispatch(
        getEnsName({
          address,
          provider,
        })
      );
    };
    func();
  }, [signer]);

  // console.log(addressfinal)

  const handleOnClick = () => {};

  return (
    <div className="navbarContainer">
      {navbarMobile ? null : (
        <>
          <div className="navbarLogo">
            <Link href="/">
              <Image src={logo} width="100" height="100" alt="" />
            </Link>
          </div>

          <div className="navbarList">
            {navbarList.map((listItem, index) => (
              <div
                key={index}
                className={
                  listItem.link ===
                  urlpath.substring(0, listItem.link.length + 1)
                    ? "activeNavbarItem"
                    : "navbarItem"
                }
              >
                <Link href={listItem.link}>
                  <p>{listItem.name}</p>
                </Link>
              </div>
            ))}
          </div>
          <div
            className="connectionbtn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {addressfinal ? (
              <Link href="/profile">
                <div
                  className="btn"
                  style={{
                    padding: "6px 8px",
                    borderRadius: "100%",
                    margin: "10px",
                  }}
                >
                  <FaUser size={18} onClick={handleOnClick} />
                </div>
              </Link>
            ) : null}
            {connectionButton(ensName)}
          </div>
          <BiMenuAltRight
            className="navbarIcon"
            size={30}
            onClick={() => dispatch(changeNavbarState())}
          />
        </>
      )}

      {navbarMobile ? (
        <div className="navbarMobile">
          <BiX
            className="navbarMobileClose"
            onClick={() => dispatch(changeNavbarState())}
            size={30}
          />
          {navbarList.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => dispatch(changeNavbarState())}
            >
              <h3 className="navbarMobileItem" key={index}>
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
