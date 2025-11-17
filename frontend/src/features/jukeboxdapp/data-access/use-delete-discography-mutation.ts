import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getDeleteDiscographyInstruction } from '@project/anchor';
import { toastTx } from '@/components/toast-tx';
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react';
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill';
import { Address } from 'gill'; // Import Address from gill

interface DeleteDiscographyOptions {
  discography: Address<string>; // Change type to Address<string>
}

export function useDeleteDiscographyMutation({ account }: { account: UiWalletAccount }) {
  const txSigner = useWalletUiSigner({ account });
  const signAndSend = useWalletUiSignAndSend();

  return useMutation({
    mutationFn: async ({ discography }: DeleteDiscographyOptions) => {
      const instruction = getDeleteDiscographyInstruction({
        authority: txSigner,
        discography,
      });
      return await signAndSend(instruction, txSigner);
    },
    onSuccess: (signature) => {
      toastTx(signature);
    },
    onError: (err) => {
      toast.error('Failed to delete discography');
      console.error(err);
    },
  });
}
