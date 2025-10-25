import hre from "hardhat";

async function main() {
  const contractAddress = process.argv[2] || process.env.CONTRACT_ADDRESS || "0x8e9e8f5Fc6C9b2e8d5F8f9e8e9e8f5Fc6C9b2e8d5F8f9e8";

  if (!contractAddress) {
    console.error("❌ Please provide a contract address as an argument or set CONTRACT_ADDRESS in .env");
    console.log("Usage: npx hardhat run scripts/verify.js --network <network> <contractAddress>");
    process.exit(1);
  }

  const deployerAddress = "0x67f00D195f970fa2E34b7C6D11cE06e5966f2201";

  console.log(`🔍 Verifying contract at: ${contractAddress}`);
  console.log(`📡 Network: ${hre.network.name}`);
  console.log(`👤 Deployer: ${deployerAddress}`);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployerAddress],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error) {
    console.log("❌ Verification failed:", error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Make sure the contract is deployed and confirmed on the blockchain");
    console.log("2. Check that your API key is correct in .env");
    console.log("3. Try again in a few minutes if the transaction is very recent");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});