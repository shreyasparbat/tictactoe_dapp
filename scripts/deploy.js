const hre = require("hardhat");

async function main() {
  // Create Greeter contract
  const Betting = await hre.ethers.getContractFactory("Betting");
  const betting = await Betting.deploy();

  // Deploy
  await betting.deployed();

  // Print contract address
  console.log("Betting deployed to:", betting.address);
}

// Run main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
