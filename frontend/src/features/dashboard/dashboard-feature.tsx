'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useGetDiscographyAccountsQuery } from '../jukeboxdapp/data-access/use-get-discography-accounts-query'
import { Combobox } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { Account } from 'gill'
import { Discography } from '@project/anchor'
import { useRouter } from 'next/navigation'

export default function DashboardFeature() {
  const [selectedSong, setSelectedSong] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const { data: accounts, isLoading } = useGetDiscographyAccountsQuery()
  type DiscographyAccount = Account<Discography, string>
  const router = useRouter()

  useEffect(() => {
    if (!selectedSong && audioRef.current) {
      audioRef.current.src = 'https://www.myinstants.com/media/sounds/juke-box-start-up.mp3'
      //audioRef.current.play()
    }
  }, []) // Empty dependency array to run only once on mount

  useEffect(() => {
    if (audioRef.current && selectedSong) {
      audioRef.current.src = selectedSong
      audioRef.current.play()
    }
  }, [selectedSong])

  const songs =
    accounts?.map((account: DiscographyAccount) => ({
      value: account.data.songUrl,
      label: `${account.data.artist} - ${account.data.songName}`,
    })) ?? []

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }
  const handleAdd = () => { router.push('/jukeboxdapp') }

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // ensure the background fills and preserves aspect ratio (cover)
      }}
    >
  <div className="flex flex-col items-center p-8 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg max-w-[95vw]">
        <h1 className="text-4xl font-bold text-white mb-4">Juke Box 🤠🎸</h1>
        {isLoading ? (
          <p className="text-white">Loading songs...</p>
        ) : (
          <Combobox
            items={songs}
            value={selectedSong}
            onChange={setSelectedSong}
          />
        )}
        <div className="mt-4 gap-2 flex">
          <Button onClick={handlePlay}>
            Play
          </Button>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <audio ref={audioRef} src={selectedSong || undefined} />
      </div>
    </div>
  )
}
