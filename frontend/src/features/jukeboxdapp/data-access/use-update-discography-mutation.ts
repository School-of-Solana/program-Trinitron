import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getUpdateDiscographyInstruction } from '@project/anchor';
import { toastTx } from '@/components/toast-tx';
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react';
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill';
import { Address } from 'gill'; // Import Address from gill

interface UpdateDiscographyOptions {
  discography: Address<string>;
  album: string;
  artist: string;
  songName: string;
  songUrl: string;
}

export function useUpdateDiscographyMutation({ account }: { account: UiWalletAccount }) {
  const txSigner = useWalletUiSigner({ account });
  const signAndSend = useWalletUiSignAndSend();

  return useMutation({
    mutationFn: async ({ discography, album, artist, songName, songUrl }: UpdateDiscographyOptions) => {
      const instruction = getUpdateDiscographyInstruction({
        authority: txSigner,
        discography,
        album,
        artist,
        songName,
        songUrl,
      });
      return await signAndSend(instruction, txSigner);
    },
    onSuccess: (signature) => {
      toastTx(signature);
    },
    onError: (err) => {
      toast.error('Failed to update discography');
      console.error(err);
    },
  });
}
