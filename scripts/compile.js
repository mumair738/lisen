import fs from "fs";
import solc from "solc";

const source = fs.readFileSync("./contracts/LisenToken.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "LisenToken.sol": { content: source },
  },
  settings: {
    optimizer: { enabled: true, runs: 200 },
    outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output keys:", Object.keys(output));
if (output.errors) {
  console.log("Compilation errors:", output.errors);
}
console.log("Contracts:", output.contracts);
if (output.contracts && output.contracts["LisenToken.sol"]) {
  const contract = output.contracts["LisenToken.sol"]["LisenToken"];

  fs.writeFileSync("./LisenToken_abi.json", JSON.stringify(contract.abi, null, 2));
  fs.writeFileSync("./LisenToken_bytecode.txt", contract.evm.bytecode.object);

  console.log("✅ Compiled successfully!");
} else {
  console.log("❌ Compilation failed - no contracts found");
}