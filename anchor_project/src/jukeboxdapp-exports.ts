// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import JukeboxdappIDL from '../target/idl/jukeboxdapp.json'
import { DISCOGRAPHY_DISCRIMINATOR, JUKEBOXDAPP_PROGRAM_ADDRESS, Discography, getDiscographyDecoder } from './client/js'


export type DiscographyAccount = Account<Discography, string>

// Re-export the generated IDL and type
export { JukeboxdappIDL }

export * from './client/js'

export function getDiscographyProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getDiscographyDecoder(),
    filter: getBase58Decoder().decode(DISCOGRAPHY_DISCRIMINATOR),
    programAddress: JUKEBOXDAPP_PROGRAM_ADDRESS,
  })
}