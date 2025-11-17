'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useGetDiscographyAccountsQuery } from '../jukeboxdapp/data-access/use-get-discography-accounts-query'
import { Combobox } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'

export default function DashboardFeature() {
  const [selectedSong, setSelectedSong] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const { data: accounts, isLoading } = useGetDiscographyAccountsQuery()

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
    accounts?.map((account) => ({
      value: account.account.songUrl,
      label: `${account.account.artist} - ${account.account.songName}`,
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

  return (
    <div
      className="flex items-center justify-center min-h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="flex flex-col items-center p-8 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">Jukebox</h1>
        {isLoading ? (
          <p className="text-white">Loading songs...</p>
        ) : (
          <Combobox
            items={songs}
            value={selectedSong}
            onChange={setSelectedSong}
          />
        )}
        <div className="mt-4">
          <Button onClick={handlePlay} className="mr-2">
            Play
          </Button>
          <Button onClick={handlePause}>Pause</Button>
        </div>
        <audio ref={audioRef} src={selectedSong || undefined} />
      </div>
    </div>
  )
}
