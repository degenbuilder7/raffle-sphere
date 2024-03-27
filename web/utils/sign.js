import { Connection } from "@solana/web3.js";
import { confirmTransactionFromFrontend } from "./shyftutils";
export async function signAndConfirmBoth(network,encodedTransaction,callback,wallet) 
{

    const clusterApiUrl = (network) => {
        switch (network) {
          case 'mainnet':
            return 'https://api.mainnet-beta.solana.com';
          case 'testnet':
            return 'https://api.testnet.solana.com';
          case 'devnet':
          default:
            return 'https://api.devnet.solana.com';
        }
      };

    const connection = new Connection(clusterApiUrl(network), 'confirmed');
  
    const finalizedTxn = await confirmTransactionFromFrontend(connection,encodedTransaction,wallet);
    console.log(finalizedTxn);
    connection.onSignature(finalizedTxn, callback, "finalized");
    return finalizedTxn;
  }