import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  const LisenToken = await hre.ethers.getContractFactory("LisenToken");
  const token = await LisenToken.deploy(deployer.address);
  await token.waitForDeployment();

  console.log(`✅ LisenToken deployed at: ${await token.getAddress()}`);
  console.log(`💰 Deployed by: ${deployer.address}`);

  // Optionally verify contract if on a supported network
  const network = hre.network.name;
  if (network !== "hardhat" && network !== "localhost") {
    console.log("🔍 Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: await token.getAddress(),
        constructorArguments: [deployer.address],
      });
      console.log("✅ Contract verified successfully");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});