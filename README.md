# Zapp 

# 🧭 Table of contents

- [Introduction](#Introduction)
- [🚀 Quick Start](#Quick-Start)
- [What this App Uses](#What-this-App-uses)
	- [`Frontend`](#Frontend)
	- [`Backend`](#Backend)
	- [`Blockchain`](#Blockchain)
	
	- [`Database`](#Databasse)
- [Where is this Deployed](#Where-is-this-App-deployed)
- [Future Plans](#Future-Aspirations-for-this-App)



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

📄 Clone or fork this repo :`https://github.com/prakhar728/Ethermions_ETHIndia22`:

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

This App uses Next.JS for rendering the frontend of the project. The frontend is integrated with both the backend and blockchain.

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


# Database

This app uses `MongoDB` for all its database needs. This App uses DB to:
 
 - Store NFTs that are open to borrow.
 - Storing and updating the status of an NFT after transaction

# Where is this App deployed

`Frontend` 
- The frontend of this app is deployed on :
https://EthermionsETHIndia22.prakharojha.repl.co

- and on Valist on:
https://bafybeid6gumvub2ostsl7q7ijle35g4uwyxa5vecott5gkqb2asuax226e.ipfs.w3s.link/

`Backend`
- The Backend of this app is deployed on https://ether-meons.onrender.com

# Future Aspirations for this App

There are some features which can be added in future:
 - NFT Upgradation from static to Dynamic.
 - Dynamic NFT Marketplace.
 
