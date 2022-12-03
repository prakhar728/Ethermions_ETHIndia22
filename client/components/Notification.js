import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";

const PK = `8fde8d9e75f063b5c60bf1707918eedd2ad74bad061b1a6337b8bd74c1a5fc5f`; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const { account, library, chainId } = useWeb3React();
const fSginer = library.getSigner(account);

console.log(fSginer);

export const SendNotification = async (MsgTitle, MsgBody) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3,
      identityType: 2,
      notification: {
        title: `SDK-TEST notification Title `,
        body: `SDK-TEST notification Body `,
      },
      payload: {
        title: { MsgTitle },
        body: { MsgBody },
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${account}`, // recipient address
      channel: "eip155:5:0x9391eDa3528EDbB02C44CE171c4f6b68A9cE4C34", // your channel address
      env: "staging",
    });
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err.message);
  }
};

export const FetchNotification = async () => {
  try {
    const notification = await PushAPI.user.getFeeds({
      user: "eip155:5:0x2c2148C9995A94Cf3c4365B19125027B5b94c51D",
      spam: true,
      env: "staging",
    });
    console.log(notification);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

export const FetchSubscription = async () => {
  try {
    const subscriptions = await PushAPI.user.getSubscriptions({
      user: "eip155:5:0x2c2148C9995A94Cf3c4365B19125027B5b94c51D", // user address in CAIP
      env: "staging",
    });
    console.log(subscriptions);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};
