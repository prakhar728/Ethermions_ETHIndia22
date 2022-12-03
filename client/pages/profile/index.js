import React, { useState } from "react";
import Link from "next/link";
import { BiWalletAlt } from "react-icons/bi";
import Layout from "../../components/Layout";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import Profile from "../../components/profile/Profile";
import Loan from "../../components/profile/Loan";
import Lent from "../../components/profile/Lent";
import { FaUser } from "react-icons/fa";
import Offer from "../../components/profile/Offer";

const tabs = [
  {
    name: "MY PROFILE",
    icon: <FaUser size={20} className="icons" />,
  },
  {
    name: "MY LENT",
    icon: <BiWalletAlt size={20} className="icons" />,
  },
  {
    name: "MY LOAN",
    icon: <BsCashCoin size={20} className="icons" />,
  },
  {
    name: "MY OFFER",
    icon: <MdOutlineLocalOffer size={20} className="icons" />,
  },

];

function index() {
  const [tab, setTab] = useState("MY PROFILE");
  console.log(tab);
  return (
    <Layout>
      <div className="profileContainer">
        <div className="profileSidebar">
          <div className="innerContainer1">
            {tabs.map((item) => (
              <div
                className="ic1"
                onClick={() => setTab(item.name)}
                style={item.name === tab ? { color: "#9925ad" } : null}
              >
                {item.icon}
                <h4>{item.name}</h4>
              </div>
            ))}
          </div>
          <div className="innerContainer2">
            <div className="ic2">
              <h5>SUPPORT</h5>
            </div>
            <div className="ic2">
              <h5>FAQ</h5>
            </div>
            <div className="ic2">
              <h5>TERMS & CONDITIONS</h5>
            </div>
          </div>
        </div>
        <div className="profileDetailContainer">
          {tab === "MY PROFILE" ? (
            <div className="profileBgContainer">
              <Profile />
            </div>
          ) : tab === "MY LOAN" ? (
            <Loan />
          ) : tab === "MY LENT" ? (
            <Lent />
          ) : tab === "MY OFFER" ? (
            <Offer />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default index;
