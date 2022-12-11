import { ConnectButton } from "@rainbow-me/rainbowkit";

export function connectionButton(ensName) {
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
