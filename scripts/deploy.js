const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "print balance").setAction(async function (
  taskArguments,
  hre
) {
  const account = getAccount();
  console.log(
    `Account balance for ${account.address}: ${await account.getBalance()}`
  );
});

task("deploy", "deploy the NFT.sol").setAction(async function (
  taskArguments,
  hre
) {
  const nftContractFactory = await hre.ethers.getContractFactory(
    "NFT",
    getAccount()
  );
  const nft = await nftContractFactory.deploy();
  await nft.deployed();
  console.log(`NFT deployed at ${nft.address}`);
});
