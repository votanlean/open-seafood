const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const fetch = require("node-fetch");

task("mint", "Mint from the NFT contract")
  .addParam("address", "The address to receive a token")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const transactionResponse = await contract.mintTo(taskArguments.address, {
      gasLimit: 500_000,
    });
    console.log(`Transaction hash: ${transactionResponse.hash}`);
  });

task(
  "set-base-token-uri",
  "set the base token URI for the deployed smart contract"
)
  .addParam("baseUrl", "The base of tokenURI")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const transactionResponse = await contract.setBaseTokenURI(
      taskArguments.baseUrl,
      {
        gasLimit: 500_000,
      }
    );
    console.log(`Transaction hash: ${transactionResponse.hash}`);
  });

task("token-uri", "Fetches the token URI for the token ID")
  .addParam("tokenId", "The token ID to fetch metadata from")
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const tokenURI = await contract.tokenURI(taskArguments.tokenId, {
      gasLimit: 500_000,
    });
    console.log(`Token URI: ${tokenURI}`);
    const metadata = await fetch(tokenURI).then((res) => res.json());
    console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
  });
