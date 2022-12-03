import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectionButton, navbarList } from "./Header.data";
import { FaUser } from "react-icons/fa";
import { BiMenuAltRight, BiX } from "react-icons/bi";
// Assets imports
import logo from "../assets/images/logo.png";
// redux imports
import { changeNavbarState, saveAddressAndSigner } from "../redux/navbar";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { navbarMobile } = useSelector((state) => state.navbar);
  const router = useRouter();
  const urlpath = router.pathname;

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
            {connectionButton()}
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