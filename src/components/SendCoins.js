import { ethers } from "ethers";
import { useState } from "react";

import DemoToken from "../artifacts/contracts/demoToken.sol/DemoToken.json";

const DemoTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function SendCoins() {
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  function getContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = getContract(DemoTokenAddress, DemoToken.abi, provider);
      let balance = await contract.balanceOf(account);
      balance = parseInt(balance._hex, 16) / 10 ** 20;
      console.log("Balance: ", balance);
    }
  }
  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract(DemoTokenAddress, DemoToken.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(
        `${Number(amount) / 10 ** 18} Coins successfully sent to ${userAccount}`
      );
    }
  }

  return (
    <div className="d-inline">
      <input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="Account ID"
      ></input>{" "}
      <input
        onChange={(e) => setAmount((e.target.value * 10 ** 18).toString())}
        placeholder="Amount"
      ></input>{" "}
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={sendCoins}>Send Coins</button>
    </div>
  );
}

export default SendCoins;
