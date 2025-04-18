import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowCounterClockwise, Pause, Play, SpeakerHigh, SpeakerLow, SpeakerX } from '@phosphor-icons/react'
import { useWavesurfer } from '@wavesurfer/react'

import Button from '@components/Button'
import Slider from '@components/Slider'

type AudioPlayerProps = HTMLAttributes<HTMLDivElement> & {
  url: string
}

function AudioPlayer({ url }: AudioPlayerProps) {
  const containerRef = useRef(null)
  const [volume, setVolume] = useState(0.375)
  const [isMuted, setIsMuted] = useState(false)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: url,
    audioRate: 1.0,
    waveColor: '#d1cfc0',
    progressColor: '#949287',
    cursorColor: '#d1cfc0',
    barWidth: 3,
    barRadius: 3,
    barHeight: 1,
    height: 75,
    hideScrollbar: true,
    dragToSeek: true,
  })

  const handlePlayPause = useCallback(() => {
    wavesurfer?.playPause()
  }, [wavesurfer])

  const handleRestart = useCallback(() => {
    wavesurfer?.stop()
    wavesurfer?.play()
  }, [wavesurfer])

  useEffect(() => {
    wavesurfer?.setVolume(volume)
    wavesurfer?.setMuted(isMuted)
  }, [wavesurfer, volume, isMuted])

  const toggleMuted = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <div className="w-full mb-16">
      <div className="mb-4 w-full max-w-md mx-auto px-4" ref={containerRef}></div>
      <div className="flex items-center justify-center gap-4">
        <span className="w-12 text-right font-mono font-extrabold">{`${currentTime.toFixed(1)}s`}</span>
        <Button onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</Button>
        <Button onClick={handleRestart}>
          <ArrowCounterClockwise />
        </Button>
        <div className="flex items-center gap-2">
          <div onClick={toggleMuted} className="cursor-pointer">
            <SpeakerIcon volume={volume} isMuted={isMuted} size={20} />
          </div>
          <Slider value={volume} min={0} max={.75} step={0.01} onChange={setVolume} className="w-32" />
        </div>
      </div>
    </div>
  )
}

const SpeakerIcon = ({
  volume = 0,
  isMuted = false,
  size = 16,
}: {
  volume?: number
  isMuted?: boolean
  size?: number
}) => {
  if (volume === 0 || isMuted) return <SpeakerX size={size} weight="fill" />
  if (volume > 0 && volume <= 0.375) return <SpeakerLow size={size} weight="fill" />
  if (volume > 0.375) return <SpeakerHigh size={size} weight="fill" />
}

export default AudioPlayer
