import hre from "hardhat";

async function main() {
  console.log(`🚀 Deploying LisenToken to Base Mainnet...`);

  const LisenToken = await hre.ethers.getContractFactory("LisenToken");
  const token = await LisenToken.deploy("0x67f00D195f970fa2E34b7C6D11cE06e5966f2201");
  await token.waitForDeployment();

  const contractAddress = await token.getAddress();
  console.log(`✅ LisenToken deployed at: ${contractAddress}`);
  console.log(`🔗 View on BaseScan: https://basescan.org/address/${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});