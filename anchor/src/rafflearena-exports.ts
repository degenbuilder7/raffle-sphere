// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from '@solana/web3.js';
import type { Rafflearena } from '../target/types/rafflearena';
import { IDL as RafflearenaIDL } from '../target/types/rafflearena';

// Re-export the generated IDL and type
export { Rafflearena, RafflearenaIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  '3uiFnCeFuRZS9MymhtBTnA9MhYR68soewkM1BiHKVuK7'
);
