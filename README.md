# Mortgage Estimator DApp

A decentralized mortgage calculator that combines traditional mortgage estimation with blockchain-based access control. Users connect their crypto wallet and pay a small fee via a smart contract to unlock premium mortgage rate data.

---

## 🧠 Features

- 🧮 Real-time mortgage affordability calculator
- 🔐 Access control via smart contract (0.01 ETH to unlock data)
- 🦊 MetaMask wallet integration
- ⛓ Blockchain-based payment tracking
- 🌐 Fresh mortgage rate fetching every 7 days from external API
- 📦 Full-stack: React, TypeScript, Node.js, MongoDB, Solidity

---

## 🏗 Architecture

```
Frontend (Next.js, React, TypeScript)
  └── Connects MetaMask
  └── Checks blockchain for access rights
  └── Triggers payment transaction if needed

Backend (Node.js + Express)
  └── Fetches mortgage rates from API Ninjas
  └── Stores rates in MongoDB

Blockchain Layer (Solidity Smart Contract)
  └── AccessControl.sol
  └── Handles payment and access verification
```

---

## 🧱 Tech Stack

- **Frontend:** Next.js, React, TypeScript, ethers.js
- **Backend:** Node.js, Express, MongoDB
- **Blockchain:** Solidity, Hardhat, Ganache, MetaMask
- **Dev Tools:** VSCode, Postman, Hardhat, Vercel

---


## 🚀 Setup Instructions

1. **Install dependencies**
   - Run `npm i` in all folders (frontend, backend, blockchain).

2. **Install Ganache globally**
   - `npm i -g ganache`

3. **Set up the blockchain environment**
   - Open **Tab 1**:
     - Run `ganache`
     - Copy any private key from the list (with ETH balance)
     - Open `hardhat.config.ts` and replace the account string with the copied private key
     - Save the file

   - Open **Tab 2**:
     - Run `npx hardhat run scripts/deploy.ts --network ganache`
     - This deploys the smart contract and returns its address

4. **Set up MetaMask**
   - Install the MetaMask extension in Chrome
   - Add a new network:
     - RPC URL & Backlog URL: `http://127.0.0.1:8545`
     - Chain ID: `1337`
     - Currency Symbol: `ETH`
   - Import an account:
     - Use the same private key from Ganache
     - Make sure you're connected to the correct network and account

5. **Run the frontend**
   - Open a new terminal tab for the frontend
   - Copy the deployed contract address
   - Paste it into `frontend/app/page.ts` at the `contractAddress` variable
   - Run `npm run dev`

6. **Run the backend**
   - Open another terminal tab for the backend
   - Run `npm run devStart`

---

---

## 📜 License
MIT

