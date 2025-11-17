import { useSolana } from '@/components/solana/use-solana'

export function useGetDiscographyAccountsQueryKey() {
    const { cluster } = useSolana()
  return ['discography', 'all', { cluster }];
}
