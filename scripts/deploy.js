async function main() {
  const DemoToken = await ethers.getContractFactory("DemoToken");
  const demotoken = await DemoToken.deploy();
  await demotoken.deployed();

  console.log("Demo Token deployed to:", demotoken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
