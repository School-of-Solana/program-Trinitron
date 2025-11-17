import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCreateDiscographyInstruction } from '@project/anchor';
import { toastTx } from '@/components/toast-tx';
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react';
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill';
import { generateKeyPairSigner } from 'gill';

interface CreateDiscographyOptions {
  album: string;
  artist: string;
  songName: string;
  songUrl: string;
}


export function useCreateDiscographyMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ album, artist, songName, songUrl }: CreateDiscographyOptions) => {
      const discograpyNew = await generateKeyPairSigner()
      const instruction = getCreateDiscographyInstruction({
        payer: signer,
        album,
        artist,
        songName,
        songUrl,
        discography: discograpyNew.address
      })
      
      return await signAndSend(instruction, signer);

    },
    onSuccess: (signature) => {
      toastTx(signature);
      //await queryClient.invalidateQueries({ queryKey: ['discography', 'accounts', { cluster }] })

    },
    onError: (err) => {
      toast.error('Failed to create discography');
      console.error(err);
    },
  });
}
