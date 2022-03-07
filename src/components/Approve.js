import { ethers } from "ethers";
import { useState } from "react";

import DemoToken from "../artifacts/contracts/demoToken.sol/DemoToken.json";

const DemoTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function Approve(props) {
  const [approvalAddress, setApprovalAddress] = useState("");
  const [approvalAmount, setApprovalAmount] = useState(0);

  function getContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
  }

  async function approve() {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = getContract(DemoTokenAddress, DemoToken.abi, signer);
      await contract.approve(approvalAddress, approvalAmount);
      console.log(
        `Approved ${approvalAddress} to spend ${
          Number(approvalAmount) / 10 ** 18
        } coins`
      );
    }
  }

  return (
    <div className="d-inline">
      <input
        onChange={(e) => setApprovalAddress(e.target.value)}
        placeholder="Approval Address"
      />{" "}
      <input
        onChange={(e) =>
          setApprovalAmount((e.target.value * 10 ** 18).toString())
        }
        placeholder="Approval Amount"
      />{" "}
      <button onClick={approve}>Approve</button>
    </div>
  );
}

export default Approve;
