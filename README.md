# Zapp 

# 🧭 Table of contents

- [Zapp](#zapp)
- [🧭 Table of contents](#-table-of-contents)
- [Introduction](#introduction)
- [Quick Start for frontend](#quick-start-for-frontend)
- [Quick Start for Backend](#quick-start-for-backend)
- [What this App uses](#what-this-app-uses)
    - [This App has four main parts](#this-app-has-four-main-parts)
- [Frontend](#frontend)
- [Backend](#backend)
- [Blockchain](#blockchain)
- [Database](#database)
- [Sponsors Used for making ZaPP](#sponsors-used-for-making-zapp)
  - [Valist :](#valist-)
  - [Push :](#push-)
  - [ENS :](#ens-)
  - [IPFS :](#ipfs-)
  - [Polygon :](#polygon-)
- [Where is this App deployed](#where-is-this-app-deployed)
- [Future Aspirations for this App](#future-aspirations-for-this-app)



# Introduction

This is our Project for Submission in the Hackathon `EthIndia-2022`.

WE have made a platform where borrowers meet lenders. Collateralizing NFTs to provide loans to those who need it.

# Quick Start for frontend

📄 Clone or fork this repo :`https://github.com/prakhar728/Ethermions_ETHIndia22`:

```sh
git clone https://github.com/prakhar728/Ethermions_ETHIndia22
```

💿 Install all dependencies:

```sh
cd client
npm install
```

🚴‍♂️ Run your App:

```sh
npm start
```

# Quick Start for Backend

📄 Clone or fork this repo :
`https://github.com/prakhar728/Ethermions_ETHIndia22`:

```sh
git clone https://github.com/prakhar728/Ethermions_ETHIndia22
```

💿 Install all dependencies:

```sh
cd backend
npm install
```

🚴‍♂️ Run your App:

```sh
npm start
```

# What this App uses

### This App has four main parts 
- [`Frontend`](#Frontend)
- [`Backend`](#Backend)
- [`Blockchain`](#Blockchain)
- [`Database`](#Database)


# Frontend

We are using Next.JS for rendering the frontend of the project. The frontend is integrated with both the backend and blockchain.
We are using Redux-thunk along in javascript to make our webapp modular and easy to use. 

# Backend

At the `Backend` of this App , A `Nodejs` server is running, which manages all the `requests` and `responses` from the user. 

This App Uses Some Node_Modules in order to work properly which includes:
- `Mongoose`
  - To make requests from backend to MongoDB
- `dotenv`
    - To fetch a .env file from the backend into any file and use it as process.env.example
- `cors`
    - allows a server to indicate any origins other than its own from which a browser should permit loading resources.
- `Express`
  - create a web-server
  - handles request and response


# Blockchain

We chose polygon as the primary chain to deploy the smart contacts. This was due to polygons low gas fees and high supportibility. 
The Contract Address are:
1. Zapp nft : [0x8256c9a4fe745DFc7b37D2c1B7A3a0475F04C26f](https://mumbai.polygonscan.com/address/0x8256c9a4fe745DFc7b37D2c1B7A3a0475F04C26f#code)
2. LenderBorrower: [0xf95976D53252Fef1a77375046f551f6481f627E7](https://mumbai.polygonscan.com/address/0xf95976D53252Fef1a77375046f551f6481f627E7#code)
# Database

We are using `MongoDB` for all its database needs. This App uses DB to:
 
 - Store NFTs that are open to borrow.
 - Storing and updating the status of an NFT after transaction

# Sponsors Used for making ZaPP
## Valist : 
We are using Valist for deploying our frontend part of the website. Valist makes our web3 dapp truly decentralized by uploading the whole website to IPFS. The excellent support for Nextjs and various github integrations really helped us to deploy the website with ease with little help from the team.
## ENS :
Using ENS for displaying profile image and name instead of the address. Instead of showing the whole 42 character long address we display the name associated with it. People with avatars have a cherry on the top. 
## IPFS : 
The Decentralized Storage that goes hand in hand wherever NFTs are involved. We used web3storage and it's fast feature to store images on top of the IPFS network. The easy to integrate feature made it even easier than some cloud services. The web3link feature helped with the fast retrieval as well, making it an ideal choice for web3 dapps.
## Polygon : 
The best L-2 Solution outthere. Polygon was our first choice to deploy the smart contract wherein the contracts were directy deployed to the testnet for testing and no local host testing took place. Here's the Contract address of the contract's used here:
1. ZappNFT Contract - 
2. LenderBorrower Contract -

# Where is this App deployed

`Frontend` 
- The frontend of this app is deployed on vercel and valis :
https://ethermions-eth-india22.vercel.app/
https://bafybeid6gumvub2ostsl7q7ijle35g4uwyxa5vecott5gkqb2asuax226e.ipfs.w3s.link/


`Backend`
- The Backend of this app is deployed on https://ethhackathonserver.zaidbhimala.repl.co/


# Future Aspirations for this App

There are some features which can be added in future:
 - The project doesn't stop here. We aim to take it further and realized during the hackathon hours that we weren't able to explore all the sponsors. 
 Some Sponsors that we would definitely make use of in the future are :
 1. Revise - Dynamic NFTs, make NFTs that upgrade if staked for a long period of time over our platform.
 2. Hyperlane - Allow cross-chain nft staking and locking mechanism.
 
