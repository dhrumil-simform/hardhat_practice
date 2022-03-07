const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let token;
  let owner;
  let addr1;
  let addr2;
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("DemoToken");
    token = await Token.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should supply tokens to the Owner", async function () {
    await token.deployed();
    expect(await token.balanceOf(owner.address)).to.equal(1000000);
  });

  it("Should return total supply", async function () {
    expect(await token.totalSupply()).to.equal(1000000);
  });

  it("Should approve transfer from owner", async function () {
    await token.approve(addr1.address, 10);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 5);
    expect(await token.balanceOf(addr2.address)).to.equal(5);
  });

  it("should return the allowance of the spender", async function () {
    await token.approve(addr1.address, 10);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(10);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 4);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(6);
    expect(await token.balanceOf(addr2.address)).to.equal(4);
  });

  it("should fail if there is insufficient allowance", async function () {
    await token.approve(addr1.address, 5);
    await expect(
      token.connect(addr1).transferFrom(owner.address, addr2.address, 10)
    ).to.be.revertedWith("insufficient allowance");
  });
});
