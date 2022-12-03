import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

export function connectionButton(ensName) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/_06u4FJJGukQ9HntHpYBKifzcfhOYu5x"
  );

  // const ENSInstance = new ENS();

  const ens = async () =>
    await provider.resolveName("vitalik.eth").then((result) => {
      return result;
    });

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                backgroundColor: "white",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="btn"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="btn"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 15,
                          height: 15,
                          borderRadius: 999,
                          // overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: "12px", height: "12px" }}
                          />
                        )}
                      </div>
                    )}
                    <></>
                  </button>
                  <button
                    className="btn"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {ensName ? ensName : account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export const navbarList = [
  {
    name: "HOME",
    link: "/",
  },
  {
    name: "LEND",
    link: "/lend",
  },
  {
    name: "BORROW",
    link: "/borrow",
  },
  {
    name: "ABOUT",
    link: "/about",
  },
];
