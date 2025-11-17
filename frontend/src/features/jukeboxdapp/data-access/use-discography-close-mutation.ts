import { DiscographyAccount, getDeleteDiscographyInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useDiscographyAccountsInvalidate } from './use-discography-accounts-invalidate'

export function useDiscographyCloseMutation({ account, discography }: { account: UiWalletAccount; discography: DiscographyAccount }) {
  const invalidateAccounts = useDiscographyAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getDeleteDiscographyInstruction({ authority: signer, discography: discography.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
