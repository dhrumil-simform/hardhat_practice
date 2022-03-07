import { ethers } from "ethers";
import { useState } from "react";

import DemoToken from "../artifacts/contracts/demoToken.sol/DemoToken.json";

const DemoTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function Allowance(props) {
  const [providerAccount, setProviderAccount] = useState("");
  const [spenderAccount, setSpenderAccount] = useState("");

  function getContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
  }

  async function getAllowance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = getContract(DemoTokenAddress, DemoToken.abi, provider);
      const Allowance = await contract.allowance(
        providerAccount,
        spenderAccount
      );
      console.log(
        `${spenderAccount} can spend ${
          Number(Allowance) / 10 ** 18
        } amount of coins from ${providerAccount}`
      );
    }
  }

  return (
    <div className="d-inline">
      <input
        onChange={(e) => setProviderAccount(e.target.value)}
        placeholder="Provider Address"
      />{" "}
      <input
        onChange={(e) => setSpenderAccount(e.target.value)}
        placeholder="Spender Address"
      />{" "}
      <button onClick={getAllowance}>Get Allowance</button>
    </div>
  );
}

export default Allowance;
