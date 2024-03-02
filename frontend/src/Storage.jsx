import React, { useState, } from "react";
import './Storage.css'
import {ethers} from 'ethers'
import ABI from '../../contracts/artifacts/Storage_abi.json'

const Storage = () => {
    const [showCurrentNumber, setShowCurrentNumber] = useState(null)
    const [connectWallet, setConnectWallet] = useState("Connect Wallet")
    const [showAddress, setShowAddress] = useState("Not connected yet.")
    const [contract, setContract] = useState(null)
    
const contractAdress ='0x11C887556Ee36CbbaCfe99a40434bDB820C4Ca07'

    function connectWalletHandler(){
        if (window.ethereum){
           window.ethereum.request({method: 'eth_requestAccounts'})
              .then (result=>{
                setShowAddress(result[0])
                setConnectWallet("Wallet is Connected")
                loadBlockchainData()
               })
        }else {
            alert("You have to install metamask")
        }
    }

    const loadBlockchainData=async()=>{
        let provider = new ethers.BrowserProvider (window.ethereum)
        let signer = await provider.getSigner()
        let dataFrameBlockchain = new ethers.Contract(contractAdress, ABI, signer)
        setContract(dataFrameBlockchain)
    }
    
    const handleSubmitData= async(e)=>{
        e.preventDefault()
        // console.log(e.target.setNumber.value)
        await contract.store(e.target.setNumber.value)

    }

    const retrieveData = async() =>{
        let val = await contract.retrieve();
        setShowCurrentNumber(val.toString())
      }
    

    return (
        <div className="container">
            <h1>The Storage dApp</h1>
            <button onClick={connectWalletHandler} className="btn1">{connectWallet}</button>
            <p>Address: {showAddress}</p>
            <form onSubmit={handleSubmitData}>
                <label htmlFor="setNumber">Type Number</label>
                <input type="number" id="setNumber"/><br />
                <button type={'submit'} className="btn2">Store Number</button>
            </form>
            <button className="btn3" onClick={retrieveData}>Retrieve Number</button>
      <div className="display">{showCurrentNumber}</div>

            {/* <button className="btn3">Retrieve Number</button><div className="display">{showCurrentNumber}</div> */}
    </div >
  );
}

export default Storage;