import React, { useState } from "react";
import "./Storage.css";
import ABI from "../../contract/artifacts/Storage_abi.json";
import { ethers } from "ethers";

const Storage = () => {
  const [showCurrentNumber, setShowCurrentNumber] = useState(null);
  const [connectWallet, setConnectWallet] = useState("Connect Wallet");
  const [showAddress, setShowAddress] = useState("Not connected yet.");
  const [contract, setContract] = useState(null);

  const contractAddress = "0x5Dc7A359a43b2A0AC51785eDc1DEB874713E7e55";

  function connectWalletHandler() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setShowAddress(result[0]);
          setConnectWallet("Wallet Connected");
          loadBlockChainData()
        });
    } else {
      alert("You have to install metamask");
    }
  }

  const retrieveData = async () => {
    let val = await contract.retrieve();
    console.log(val)
    setShowCurrentNumber(val.toString())
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    console.log(e.target.setNumber.value)
    await contract.store(e.target.setNumber.value);
  };

  const loadBlockChainData = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();
    let dataFromBlockChain = new ethers.Contract(contractAddress, ABI, signer);
    setContract(dataFromBlockChain);
  };

  return (
    <div className="container">
      <button onClick={connectWalletHandler} className="btn1">
        {connectWallet}
      </button>
      <p className="address">Address: {showAddress}</p>

      <form onSubmit={handleSubmitData}>
        <input type="number" id="setNumber" placeholder="Type number..." />
        <br />
        <button type={"submit"} className="btn2">
          Store Number
        </button>
      </form>

      <div className="retrieve">
        <button className="btn3" onClick={retrieveData}>
          Retrieve Number
        </button>
        <div className="display">{showCurrentNumber}</div>
      </div>
    </div>
  );
};

export default Storage;
