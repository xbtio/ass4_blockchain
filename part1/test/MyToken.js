const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken;
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy("My Token", "MTK", ethers.utils.parseEther("1000000"));
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should return the correct name, symbol, and total supply", async function () {
    expect(await myToken.name()).to.equal("My Token");
    expect(await myToken.symbol()).to.equal("MTK");
    expect(await myToken.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should mint tokens and allocate to the owner", async function () {
    await myToken.connect(owner)._mint(addr1.address, ethers.utils.parseEther("1000"));
    expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1000"));
  });

  it("Should set block reward", async function () {
    await myToken.connect(owner).setBlockReward(20);
    expect(await myToken.blockReward()).to.equal(20);
  });

  it("Should destroy the contract", async function () {
    await myToken.connect(owner).destroy(addr1.address);
    expect(await myToken.totalSupply()).to.equal(0);
  });
});
