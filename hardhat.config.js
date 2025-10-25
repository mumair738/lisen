import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const { PRIVATE_KEY, BASESCAN_API_KEY } = process.env;
const privateKey = PRIVATE_KEY ? (PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : `0x${PRIVATE_KEY}`) : undefined;

const config = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      type: "http",
    },
    ...(privateKey && privateKey !== '0xYOUR_WALLET_PRIVATE_KEY' && privateKey.length === 66 ? {
      base: {
        url: "https://mainnet.base.org",
        accounts: [privateKey],
        type: "http",
      },
      basesepolia: {
        url: "https://sepolia.base.org",
        accounts: [privateKey],
        type: "http",
      },
    } : {}),
  },
};

if (BASESCAN_API_KEY) {
  config.etherscan = {
    apiKey: {
      base: BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "basesepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  };
}

export default config;