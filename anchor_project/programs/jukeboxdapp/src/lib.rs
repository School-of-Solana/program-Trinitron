use anchor_lang::prelude::*;

declare_id!("HapQLEoaLD5ZvatNkcVBKrCNKDJ4qnRJRMKyVke7cGjb");

#[program]
pub mod jukeboxdapp {
    use super::*;

    pub fn create_discography(
        ctx: Context<CreateDiscography>,
        album: String,
        artist: String,
        song_name: String,
        song_url: String,
    ) -> Result<()> {
        let discography = &mut ctx.accounts.discography;
        discography.album = album;
        discography.artist = artist;
        discography.song_name = song_name;
        discography.song_url = song_url;
        discography.authority = ctx.accounts.payer.key();
        Ok(())
    }

    pub fn update_discography(
        ctx: Context<UpdateDiscography>,
        album: String,
        artist: String,
        song_name: String,
        song_url: String,
    ) -> Result<()> {
        let discography = &mut ctx.accounts.discography;
        discography.album = album;
        discography.artist = artist;
        discography.song_name = song_name;
        discography.song_url = song_url;
        Ok(())
    }

    pub fn delete_discography(_ctx: Context<DeleteDiscography>) -> Result<()> {
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Discography {
    #[max_len(50)]
    pub album: String,
    #[max_len(50)]
    pub artist: String,
    #[max_len(50)]
    pub song_name: String,
    #[max_len(250)]
    pub song_url: String,
    pub authority: Pubkey,
}

#[derive(Accounts)]
pub struct CreateDiscography<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + Discography::INIT_SPACE,
        seeds = [b"discography", payer.key().as_ref()],
        bump
    )]
    pub discography: Account<'info, Discography>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDiscography<'info> {
    #[account(mut, has_one = authority)]
    pub discography: Account<'info, Discography>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteDiscography<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority, close = authority)]
    pub discography: Account<'info, Discography>,
}
