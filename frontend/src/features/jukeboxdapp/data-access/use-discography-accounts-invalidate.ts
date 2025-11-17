import { useQueryClient } from '@tanstack/react-query'
import { useGetDiscographyAccountsQueryKey } from './use-get-discography-accounts-query-key'

export function useDiscographyAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useGetDiscographyAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
