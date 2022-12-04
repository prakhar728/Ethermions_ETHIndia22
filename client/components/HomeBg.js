import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import LottieCard from "./LottieCard";

const Videobg = () => {
  const particleInit = useCallback(async (e) => {
    console.log(e);
    await loadFull(e);
  }, []);

  const particleLoaded = useCallback(async (cont) => {
    await console.log(cont);
  }, []);

  return (
    <div className="videoContainer">
      <Particles
        id="tsparticles"
        init={particleInit}
        loaded={particleLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },

          style: {
            position: "absolute",
            top: "0px",
            left: "0px",
            opacity: 0.9,
          },
          fpsLimit: 200,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "grab",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "linear-gradient(to-right, #C800FE, #5C0176)",
            },

            links: {
              color: "#9925AD",
              distance: 150,
              enable: true,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
          detectRetina: true,
        }}
      />
      <div className="videoContent">
        <h1>Decentralized Loan Marketplace for NFTs</h1>
        <h3>Borrow & Lend against valuable NFT assets.</h3>
        <div className="vidbutton">
          <Link href="/borrow">
            <button className="btn videobtn">BORROW</button>
          </Link>
          <Link href="/lend">
            <button className="btn videobtn">LEND</button>
          </Link>
        </div>
      </div>
      <LottieCard
        src="https://assets8.lottiefiles.com/private_files/lf30_iyicd2xy.json"
        className="videoImg"
      />
    </div>
  );
};

export default Videobg;
