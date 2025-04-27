1. Run "npm i" in all forlders.

2. install Ganache on your computer globally:
```
npm i -g ganache
```

3. open two tabs for blockchain
- from tab 1 run "ganache" and copy anyone private key with available ETH balance. Then go to hardhat.config.ts file and replace previous account string with the copied one and save.
- from tab 2 run "npx hardhat run scripts/deploy.ts --network ganache" this will deploy the smart contract.

4. add network and account to wallet
- install metamask on chrome
- add new network:
    RPC URL & Backlog URL: http://127.0.0.1:8545
    Chain ID: 1337
    Symbol: ETH
    Save
- add new account:
    Go to import account with private key.
    Paste any private key from ganache's tab and import
    Make sure you're on the exact same network and account you created right now!

5. Open another tab for frontend
- Copy the generated deployed address
- Paste it in "frontend/app/app.ts", at contractAddress variable.
- Save and run "npm run dev"

6. Open another tab for backend and run "npm run devStart"

