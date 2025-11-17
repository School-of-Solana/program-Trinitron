import {
  Address,
  Blockhash,
  createSolanaClient,
  createTransaction,
  getProgramDerivedAddress,
  Instruction,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchMaybeDiscography,
  getCreateDiscographyInstruction,
  getDeleteDiscographyInstruction,
  getUpdateDiscographyInstruction,
  JUKEBOXDAPP_PROGRAM_ADDRESS,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'
import { PublicKey } from '@solana/web3.js'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })
describe('jukeboxdapp', () => {
  let payer: KeyPairSigner
  let discographyPda: Address

  const album = 'album'
  const artist = 'artist'
  const songName = 'songName'
  const songUrl = 'songUrl'

  const newAlbum = 'newAlbum'
  const newArtist = 'newArtist'
  const newSongName = 'newSongName'
  const newSongUrl = 'newSongUrl'

  beforeAll(async () => {
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
    ;[discographyPda] = await getProgramDerivedAddress({
      programAddress: JUKEBOXDAPP_PROGRAM_ADDRESS,
      seeds: [Buffer.from('discography'), new PublicKey(payer.address).toBuffer()],
    })
  })

  it('should create a new discography', async () => {
    // ARRANGE
    expect.assertions(5)
    const ix = getCreateDiscographyInstruction({
      payer: payer,
      album,
      artist,
      songName,
      songUrl,
      discography: discographyPda,
    })

    // ACT
    const sx = await sendAndConfirm({ ix, payer })
    const discography = await fetchMaybeDiscography(rpc, discographyPda)

    // ASSERT
    expect(sx).toBeDefined()
    expect(discography.data.album).toBe(album)
    expect(discography.data.artist).toBe(artist)
    expect(discography.data.songName).toBe(songName)
    expect(discography.data.songUrl).toBe(songUrl)
  })

  it('should update the discography', async () => {
    // ARRANGE
    expect.assertions(5)
    const ix = getUpdateDiscographyInstruction({
      authority: payer,
      album: newAlbum,
      artist: newArtist,
      songName: newSongName,
      songUrl: newSongUrl,
      discography: discographyPda,
    })

    // ACT
    const sx = await sendAndConfirm({ ix, payer })
    const discography = await fetchMaybeDiscography(rpc, discographyPda)

    // ASSERT
    expect(sx).toBeDefined()
    expect(discography.data.album).toBe(newAlbum)
    expect(discography.data.artist).toBe(newArtist)
    expect(discography.data.songName).toBe(newSongName)
    expect(discography.data.songUrl).toBe(newSongUrl)
  })

  it('should delete the discography', async () => {
    // ARRANGE
    expect.assertions(2)
    const ix = getDeleteDiscographyInstruction({
      authority: payer,
      discography: discographyPda,
    })

    // ACT
    const sx = await sendAndConfirm({ ix, payer })
    const discography = await fetchMaybeDiscography(rpc, discographyPda)

    // ASSERT
    expect(sx).toBeDefined()
    expect(discography.exists).toBe(false)
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}