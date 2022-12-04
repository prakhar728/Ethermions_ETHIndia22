import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = "8fde8d9e75f063b5c60bf1707918eedd2ad74bad061b1a6337b8bd74c1a5fc5f";
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const opt = async () => {
  await PushAPI.channels.subscribe({
    signer: signer,
    channelAddress: "eip155:5:0x9391eDa3528EDbB02C44CE171c4f6b68A9cE4C34", // channel address in CAIP
    onSuccess: () => {
      console.log("opt in success");
    },
    onError: () => {
      console.error("opt in error");
    },
    env: "staging",
  });
};

export const notify = async () => {
  opt();
  const notifications = await PushAPI.user.getFeeds({});

  return notifications;
};
