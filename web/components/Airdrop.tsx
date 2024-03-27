"use client";
import { useState } from "react";
import axios from "axios";
import { signAndConfirmBoth } from '../utils/sign';
import styles from "../app/create.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
const AirdropToken = () => {
  const [displayPic, setDisplayPic] = useState("");
  const [image,setImage] = useState();
  const wallet = useWallet();
  const [network,setNetwork] = useState("devnet");
  const [wallet2,setWallet2] = useState(""); 
  const [name,setName] = useState("");
  const [symbol,setSymbol] = useState("");
  const [decimals,setDecimals] = useState(0);
  const [desc, setDesc] = useState("");
  
  const [fileError, setFileError] = useState("");

  const [resp,setResp] = useState();
  const [status,setStatus] = useState(false);
  const [minted,setMinted] = useState(null);

  const callback = (signature : string, result : any) => {

    console.log("Signature ", signature);
    console.log("result ", result);
    setStatus(true);

  };

  const [toWallet,setToWallet] = useState("");
  const [amt,setAmt] = useState("");

  const MintTo = () => {
    
    axios({
      // API endpoint to mint and airdrop
      url: "https://api.shyft.to/sol/v1/token/mint_detach",
      method: "POST",
      headers: {
        "x-api-key": "FVejZwLRIaPbxTUr", //Enter your API key here
      },
      data: {
        "network": network,
        "wallet": wallet,
        "receiver": toWallet,
        "token_address": minted,
        "amount": Number(amt),
      }
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res);
        if(res.data.success === true)
        {
          const encodedTransaction = res.data.result.encoded_transaction;
          const returned = signAndConfirmBoth(network,encodedTransaction,callback,wallet);
          console.log(returned);
        }
        
        setMinted(res.data.result.token_address);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className={styles.gradientbackground}>
        <div className="col">
            {status && <div className="pt-5 ps-2">
              <h2 className="pt-4 text-center text-light cfont">Airdrop this newly created Token</h2>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mt-8">
                      <label className="fname">Enter Wallet ID</label>
                      
                      <input
                        type="text"
                        className="bg-[#111111] text-white font-poppins mt-2"
                        placeholder="Enter Wallet Address to send tokens"
                        value={toWallet}
                        onChange={(e) => setToWallet(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="mt-8">
                      <label className="fname">Amount</label>
                      
                      <input
                        type="number"
                        className="bg-[#111111] text-white font-poppins mt-2"
                        placeholder="Amount"
                        value={amt}
                        onChange={(e) => setAmt(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4" style={{paddingTop:"32px"}}>
                  <div className="mt-8">
                    <button
                      className={styles.button25}
                      onClick={MintTo}
                    >
                      Airdrop
                    </button>
                    <a
                      className={styles.button25}
                      href={`https://explorer.solana.com/address/${minted}?cluster=${network}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </div>
                  </div>
                </div>
            </div>}
          
          </div>
          </div>
          
  );
};

export default AirdropToken;
