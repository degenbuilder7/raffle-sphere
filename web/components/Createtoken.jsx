"use client";
import { useState } from "react";
import axios from "axios";
import { signAndConfirmBoth } from '../utils/sign';
import styles from "../app/create.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
const CreateToken = () => {
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

  const callback = (signature, result) => {

    console.log("Signature ", signature);
    console.log("result ", result);
    setStatus(true);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("network",network);
    formData.append("wallet", wallet2);
    formData.append("name",name);
    formData.append("symbol",symbol);
    formData.append("decimals",decimals);
    formData.append("description",desc);
    formData.append("fee_payer",wallet2);
    formData.append("file",image);
    formData.append("priority_fee",100);
    
    
    axios({
        // Endpoint
        url: "https://api.shyft.to/sol/v1/token/create_detach",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY,
          "accept": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        data: formData,
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
          
          setMinted(res.data.result.mint);
        })
  
        // Catch errors if any
        .catch((err) => {
          console.log(err);
        });
  }
  const [toWallet,setToWallet] = useState("");
  const [amt,setAmt] = useState("");

  const MintTo = () => {
    
    axios({
      // API endpoint to mint and airdrop
      url: "https://api.shyft.to/sol/v1/token/mint_detach",
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY, //Enter your API key here
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
          <div
            className="form-container border border-light rounded pt-3 px-5 pb-5"
            style={{ backgroundColor: "#FFFFFF22" }}
          >
            <h2 className="pt-4 text-center text-light text-2xl">Create a new coin on Solana</h2> 
            <div>
              <div className="row">
                  <div className="col img-container text-center mt-5">
                    <div
                      className="uploaded-img"
                      style={{
                        height: "200px",
                        width: "200px",
                        backgroundColor: "grey",
                        margin: "0 auto",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={displayPic}
                        alt="To be uploaded"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="mt-3"></div>
                    <button className={styles.button24}>
                        Select File
                        </button>
                    <br></br>
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        zIndex: "3",
                        marginTop: "-50px",
                        marginLeft: "-70px",
                        width: "150px",
                        height: "40px",
                        opacity: "0",
                      }}
                      onChange={(e) => {
                        const [file_selected] = e.target.files;
                        setImage(e.target.files[0]);
                        setDisplayPic(URL.createObjectURL(file_selected));
                      }}
                    />
                    <div className="mb-3"></div>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="mt-5"></div>
                  <div className="mt-8">
                    <label className="fname">Network</label><br />
                    <small className="text-light">
                      Solana blockchain environment
                      (testnet/devnet/mainnet-beta)
                    </small>
                    <select
                      name="network"
                      className="bg-[#111111] text-white font-poppins mt-2 form-select"
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                  </div>
                  <div className="mt-8">
                    <label className="fname">Your Wallet</label>
                    <br />
                    <small className="text-light">
                      Wallet Address which will have the update_authority for
                      this NFT (string)
                    </small>
                    <input
                      type="text"
                      className="bg-[#111111] text-white font-poppins mt-2"
                      placeholder="Enter Update Authority"
                      value={wallet2}
                      onChange={(e) => setWallet2(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <label className="fname">Name</label>
                    <br />
                    <small className="text-light">
                      Your Token Name (string)
                    </small>
                    <input
                      type="text"
                      className="bg-[#111111] text-white font-poppins mt-2"
                      placeholder="Enter Token Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <label className="fname">Symbol</label>
                    <br />
                    <small className="text-light">
                      Your Token Symbol (string)
                    </small>
                    <input
                      type="text"
                      className="bg-[#111111] text-white font-poppins mt-2"
                      placeholder="Enter Token symbol"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <label className="fname">Decimals</label>
                    <br />
                    <small className="text-light">
                      Number of parts a single token can be broken into.
                    </small>
                    <input
                      type="text"
                      className="bg-[#111111] text-white font-poppins mt-2"
                      placeholder="Enter Decimal Value"
                      value={decimals}
                      onChange={(e) => setDecimals(e.target.value)}
                    />
                  </div>
                  <div className="mt-8">
                    <label className="fname">Description</label>
                    <br />
                    <small className="text-light">
                      Add a small story to this NFT (string)
                    </small>
                    <textarea
                      className="bg-[#111111] text-white font-poppins mt-2"
                      placeholder="Enter Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      className={styles.button25}
                      onClick={handleSubmit}
                    >
                      Create A New Token
                    </button>
                  </div>


                </div>
              </div>
            </div>
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
                      target
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

export default CreateToken;
