import { useQuery } from '@tanstack/react-query';
import { useSolana } from '@/components/solana/use-solana';
import { useGetDiscographyAccountsQueryKey } from './use-get-discography-accounts-query-key';
import {
  fetchAllDiscography,
  getDiscographyDiscriminatorBytes,
  JUKEBOXDAPP_PROGRAM_ADDRESS,
} from '@project/anchor';
import { Address, Base58EncodedBytes } from 'gill';
import bs58 from 'bs58';

export function useGetDiscographyAccountsQuery() {
  const { client } = useSolana();

  return useQuery({
    queryKey: useGetDiscographyAccountsQueryKey(),
    queryFn: async () => {
      const result = await client.rpc
        .getProgramAccounts(JUKEBOXDAPP_PROGRAM_ADDRESS, {
          filters: [
            {
              memcmp: {
                offset: 0n,
                bytes: bs58.encode(
                  new Uint8Array(getDiscographyDiscriminatorBytes())
                ) as Base58EncodedBytes,
                encoding: "base58",
              },
            },
          ],
          dataSlice: { offset: 0, length: 0 }, // Fetch only account metadata
        })
        .send();

      const accounts = result; // Directly use result as the array of accounts

      const addresses = accounts.map(
        (account) => account.pubkey as Address
      );

      if (!addresses.length) {
        return [];
      }

      return fetchAllDiscography(client.rpc, addresses);
    },
  });
}
