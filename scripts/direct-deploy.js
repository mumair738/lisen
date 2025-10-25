import { ethers } from "ethers";
import fs from "fs";

// Load compiled contract from artifacts
const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/LisenToken.sol/LisenToken.json", "utf8"));
const abi = artifact.abi;
const bytecode = artifact.bytecode;

async function main() {
  // Hardcoded private key for deployment (replace with your key)
  const privateKey = "0x1405e250ee3a20efb6981e626e4f9f8fe2508b64e1bd3b8af88cf8205195a997";

  if (!privateKey) {
    console.error("❌ Private key not configured");
    process.exit(1);
  }

  console.log("🚀 Deploying LisenToken directly to Base Mainnet...");

  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`👤 Deployer: ${wallet.address}`);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

  console.log("⚠️  Note: Deployment requires ~0.001 ETH. Current balance may be insufficient.");
  console.log("💡 Consider deploying to Base Sepolia testnet first: npm run deploy:basesepolia");

  // Continue anyway for testing
  if (balance < ethers.parseEther("0.0001")) {
    console.error("❌ Balance too low even for testing");
    process.exit(1);
  }

  // Deploy contract
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  console.log("⏳ Sending deployment transaction...");

  const contract = await factory.deploy(wallet.address);
  console.log(`📡 Transaction Hash: ${contract.deploymentTransaction().hash}`);

  console.log("⏳ Waiting for confirmation...");
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`✅ SUCCESS! LisenToken deployed to: ${contractAddress}`);
  console.log(`🔗 View on BaseScan: https://basescan.org/address/${contractAddress}`);

  // Get token info
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const decimals = await contract.decimals();

  console.log(`\n📊 Token Information:`);
  console.log(`   Name: ${name}`);
  console.log(`   Symbol: ${symbol}`);
  console.log(`   Decimals: ${decimals}`);
  console.log(`   Total Supply: ${ethers.formatEther(totalSupply)} ${symbol}`);
  console.log(`   Owner: ${wallet.address}`);

  console.log(`\n🎉 Deployment completed successfully!`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});