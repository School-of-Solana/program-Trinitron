'use client';

import { UiWalletAccount } from '@wallet-ui/react';
import { Button } from '@/components/ui/button';
import { useCreateDiscographyMutation } from '../data-access/use-create-discography-mutation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function JukeboxdappUiCreate({ account }: { account: UiWalletAccount }) {
  const createDiscographyMutation = useCreateDiscographyMutation({ account });
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [songUrl, setSongUrl] = useState('');

  const handleSubmit = () => {
    createDiscographyMutation.mutateAsync({
      album,
      artist,
      songName,
      songUrl,
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <Input
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <Input
        placeholder="Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <Input
        placeholder="Song URL"
        value={songUrl}
        onChange={(e) => setSongUrl(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        disabled={createDiscographyMutation.isPending}
      >
        Create{createDiscographyMutation.isPending && '...'}
      </Button>
    </div>
  );
}
