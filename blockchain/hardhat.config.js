/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  settings: {
   optimizer: {
     enabled: true,
     runs: 200
   },},
  networks: {
   hardhat: {},
   matic: {
     url: "https://rpc-mumbai.maticvigil.com",
     accounts: [process.env.PRIVATE_KEY]
   } 
 },
};
