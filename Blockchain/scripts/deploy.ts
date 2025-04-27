import { ethers } from "hardhat";

async function main() {
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();

  await accessControl.waitForDeployment(); 

  console.log("AccessControl deployed to:", await accessControl.getAddress()); 
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


// npx hardhat run scripts/deploy.ts --network ganache
