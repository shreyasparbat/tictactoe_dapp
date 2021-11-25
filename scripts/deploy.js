const hre = require("hardhat");

async function main() {
  // Create Greeter contract
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // Deploy
  await greeter.deployed();

  // Print contract address
  console.log("Greeter deployed to:", greeter.address);
}

// Run main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
