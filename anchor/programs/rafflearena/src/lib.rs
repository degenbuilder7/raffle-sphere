use anchor_lang::prelude::*;

declare_id!("3uiFnCeFuRZS9MymhtBTnA9MhYR68soewkM1BiHKVuK7");

#[program]
pub mod rafflearena {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
