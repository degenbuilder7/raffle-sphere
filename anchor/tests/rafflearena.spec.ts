import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Rafflearena } from '../target/types/rafflearena';

describe('rafflearena', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Rafflearena as Program<Rafflearena>;

  it('should run the program', async () => {
    // Add your test here.
    const tx = await program.methods.greet().rpc();
    console.log('Your transaction signature', tx);
  });
});
