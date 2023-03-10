import abi from "./contracts/demo.json"
import {useState,useEffect} from 'react';
import {ethers, Signer} from 'ethers';
import Buy from "./components/Buy";
import Memos from "./components/Memos";
// import cofee from "./cofee.png";
// import Image from 'react-image-resizer';

import './App.css';

function App() {
  const [state,setState] = useState({
    provider : null,
    signer : null,
    contract :  null,

  });
  const [account, setAccount] = useState("None");
  useEffect(()=>{
    const connectWallet = async()=>{
      const contractAddress = "0x2BA7675698bfa41e987d16f27eB05F05DCAc41A0";
      const contractAbi = abi.abi;

      try{
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({method : "eth_requestAccounts"})
        
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractAbi,signer);
        setAccount(account);
       setState({provider,signer,contract});
      }
      else{
        alert("Metamask not installed");
      }
    }
   
      
      catch{
        console.error();
      }


    };
    connectWallet();

  },[]);
  console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "10%" , width:"100%"}}>
   
     
        {/* <small>Connected Account - {account}</small> */}
   

   
    <div>
    
    <p>Connected Account -{account}</p>
    <Buy state={state}> </Buy>
   
   
   
    <Memos state={state}></Memos>
  
    </div>
    //  </div>
    // </div>
  );
}

export default App;
