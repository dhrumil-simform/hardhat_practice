import { ethers } from "ethers";
import { useState } from "react";

import DemoToken from "../artifacts/contracts/demoToken.sol/DemoToken.json";

const DemoTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function SendCoinsFrom(props) {
  const [amount, setAmount] = useState(0);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  function getContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
  }

  async function sendCoinsFrom() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract(DemoTokenAddress, DemoToken.abi, signer);
      const transation = await contract.transferFrom(
        fromAccount,
        toAccount,
        amount
      );
      await transation.wait();
      console.log(
        `${amount} Coins successfully sent from ${
          Number(fromAccount) / 10 ** 18
        } to ${toAccount}`
      );
    }
  }

  return (
    <div className="d-inline">
      <input
        onChange={(e) => setFromAccount(e.target.value)}
        placeholder="Owner Address"
      ></input>{" "}
      <input
        onChange={(e) => setToAccount(e.target.value)}
        placeholder="Recepient Address"
      ></input>{" "}
      <input
        onChange={(e) => setAmount((e.target.value * 10 ** 18).toString())}
        placeholder="Amount"
      ></input>{" "}
      <button onClick={sendCoinsFrom}>Send Coins</button>
    </div>
  );
}

export default SendCoinsFrom;
