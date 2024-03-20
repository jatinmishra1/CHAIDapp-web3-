import { useState, useEffect } from "react";
import abi from "./contractJSON/chai.json";
import { ethers } from "ethers";
import Memos from "./components/Memo";
import Buy from "./components/Buy";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  useEffect(() => {
    const template = async () => {
      const contractAddres = "0x78bD1A23E31B79016254aBAB7C149AdbFDDa792B";
      const contractABI = abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);
  function handleCopy(account) {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    // Assign the text content to the textarea
    textarea.value = account;
    // Append the textarea to the document body
    document.body.appendChild(textarea);
    // Select the text inside the textarea
    textarea.select();
    // Execute the copy command
    document.execCommand("copy");
    // Remove the temporary textarea
    document.body.removeChild(textarea);
    // Show an alert message

    alert("Text copied to clipboard: " + account);
  }
  return (
    <div>
      <img
        src="/images/chai.png"
        className="img-fluid"
        alt=".."
        width="100%"
        style={{ width: "1328px", height: "200px", borderRadius: "20px" }}
      />
      <p
        style={{
          marginTop: "10px",
          marginLeft: "5px",
          position: "relative",
        }}
      >
        <small>Connected Account - {account}</small>
        <img
          style={{
            marginLeft: "10px",
            marginTop: "3px",
            height: "20px",
            position: "absolute",
            width: "20px",
          }}
          src="/images/cpoy.png"
          onClick={() => handleCopy(account)}
        ></img>
      </p>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
