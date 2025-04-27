import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [ "0x7304a8ad66eafd81433a348fe8f4539789e754c3be7ef086be1377d2f3438953" ]
    }
  }
};

export default config;
