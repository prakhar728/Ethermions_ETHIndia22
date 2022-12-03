import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Web3Storage } from "web3.storage";
import { create } from "ipfs-http-client";
import TextInput from "../../components/form/TextInput";
import { mintNft } from "../../redux/borrow";
import { setError } from "../../redux/error";
import { setSuccess } from "../../redux/success";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error";
import Success from "../../components/Success";
import Loader from "../../components/Loader";
import axios from "axios";

const projectId = "2Hudfo5sCvhNRgff6cSVH6o7OCJ";
const projectSecret = "ebebdc46b40438ee646c43cba5dbca9e";

const index = () => {
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`;
  const storage = new Web3Storage({ token: token });

  const { loading } = useSelector((state) => state.borrow);
  const { walletAddress, nft_contract_address } = useSelector(
    (state) => state.navbar
  );

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    console.log("clicked");
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });

    setLocalLoading(true);
    client
      .add(JSON.stringify(data))
      .then((response) => {
        console.log("result", `https://ipfs.io/ipfs/${response.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${response.path}`;
        console.log("addresss", walletAddress);
        console.log("dataIPFS", dataIpfs);
        axios
          .post(
            `https://api.defender.openzeppelin.com/autotasks/aa12f8ce-e36d-4d68-8d8e-a02e041ffadf/runs/webhook/8b8f9462-e7fe-4991-8772-9336c70ab89f/hPwdKkpLRVfC8qErtQKUy`,
            {
              reciever: walletAddress,
              tokenUri: dataIpfs,
            }
          )
          .then((response) => {
            console.log("minted on Blockchain", response);
            const ti = parseInt(JSON.parse(response?.data?.result).hex, 16);
            console.log(ti);
            dispatch(
              mintNft({
                ...data,
                contract_address: nft_contract_address,
                token_id: ti - 1,
              })
            )
              .unwrap()
              .then(() => {
                setLocalLoading(false);
                dispatch(setSuccess("NFT minted Successfully!"));
              })
              .catch((err) => {
                setLocalLoading(false);
              });
          })
          .catch((error) => {
            console.log(error);
          });
        setLocalLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(setError("Failed to generate IPFS link, Please retry"));
        setLocalLoading(false);
        return;
      });
    // console.log("data ipfs link: ", dataIpfs)
  };

  const nftUpload = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    // ipfs
    const nFile = e.target.files;
    console.log(nFile);

    storage
      .put(nFile)
      .then((res) => {
        console.log(res);
        setLocalLoading(false);
        setData({
          ...data,
          image: `https://ipfs.io/ipfs/${res}/${nFile[0].name}`,
        });
      })
      .catch((err) => {
        setLocalLoading(false);
        dispatch(setError(err.message));
      });
    // console.log(rootCID)
    // console.log(nFile[0].name)
    // console.log(`https://ipfs.io/ipfs/${rootCID}/${nFile[0].name}`)

    // createFundraiser(`https://ipfs.io/ipfs/${result.path}`);

    console.log(data.image);
  };

  //   const createFundraiser = async (metadata) => {
  //     try {
  //       await (await contracts[0].createCampaign(metadata)).wait();
  //       const id = await contracts[0].campaignIDReturn();
  //       console.log(id);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Layout>
      <div className="mintContainer">
        <div className="widthDiv">
          <h1>Mint a NFT</h1>
        </div>
        <Error />
        <div>
          <input
            name="image"
            type="file"
            value={data.imgInput}
            onChange={nftUpload}
            className="fileInput"
          />
        </div>
        <div>
          <TextInput
            name="title"
            title="Title"
            value={data.title}
            handleChange={handleChange}
            placeholder="Item Name"
          />
        </div>
        <div>
          <label className="inputLabel">
            Description:
            <textarea
              className="inputBox"
              name="description"
              value={data.description}
              onChange={(e) => handleChange(e)}
              placeholder="Provide detailed description of your item"
            />
          </label>
        </div>
        <div className="widthDiv">
          <button className="btn mintBtn" onClick={handleClick}>
            {loading || localLoading ? (
              <Loader height="25" width="25" />
            ) : (
              "Mint"
            )}
          </button>
        </div>
      </div>
      <Success />
    </Layout>
  );
};

export default index;
