import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { wrapper } from "../redux/store";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/navbar.css";
import "../styles/globals.css";
import "../styles/homeBg.css";
import "../styles/lend/lend.css";
import "../styles/borrow/borrow.css";
import "../styles/borrow/vault.css";
import "../styles/borrow/card.css";
import "../styles/lend/lendDetails.css";
import "../styles/mint/mintform.css";
import "../styles/login.css";
import "../styles/profile/profile.css";
import "../styles/profile/loans.css";
import "../styles/profile/offer.css";
import "../styles/profile/profileCard.css";
import "../styles/modal.css";
import "../styles/profile/lent.css";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.polygonMumbai,
  ],
  [
    alchemyProvider({ apiKey: "M6wTJ_1DsrJkSUE0qusDZO96oASJC8xS" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default wrapper.withRedux(MyApp);
