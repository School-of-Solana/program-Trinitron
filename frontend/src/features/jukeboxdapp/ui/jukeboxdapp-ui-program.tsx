import { useGetDiscographyAccountsQuery } from '../data-access/use-get-discography-accounts-query';
import { AppAlert } from '@/components/app-alert';
import { useSolana } from '@/components/solana/use-solana';
import { useDeleteDiscographyMutation } from '../data-access/use-delete-discography-mutation';
import { Button } from '@/components/ui/button';
import { UiWalletAccount } from '@wallet-ui/react';
import { AlertDescription } from '@/components/ui/alert'; // Added import
import { Address } from 'gill'; // Added import

export function JukeboxdappUiProgram() {
  const { cluster, account } = useSolana();
  const query = useGetDiscographyAccountsQuery();
  const deleteDiscographyMutation = useDeleteDiscographyMutation({
    account: account as UiWalletAccount,
  });

  if (query.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!query.data?.length) {
    return (
      <AppAlert
        action={
          <AlertDescription>
            No discography accounts found on {cluster.label}. Be sure to create one first.
          </AlertDescription>
        }
      >
        No discography found
      </AppAlert>
    );
  }
  return (
    <div className={'space-y-6'}>
      {query.data.map((account) => (
        <div key={account.address} className="border p-4 rounded-md">
          <h2 className="text-lg font-bold">{account.data.album}</h2>
          <p className="text-gray-500">{account.data.artist}</p>
          <p>{account.data.songName}</p>
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => alert('Update not implemented yet')}
            >
              Update
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteDiscographyMutation.mutateAsync({
                  discography: account.address as Address<string>,
                })
              }
              disabled={deleteDiscographyMutation.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
