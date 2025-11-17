import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getDiscographyProgramAccounts } from '@project/anchor'
import { useGetDiscographyAccountsQueryKey } from './use-get-discography-accounts-query-key'

export function useGillnexttailwindbasicAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useGetDiscographyAccountsQueryKey(),
    queryFn: async () => await getDiscographyProgramAccounts(client.rpc),
  })
}
