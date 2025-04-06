import { HTMLAttributes, useCallback, useRef } from 'react'
import { ArrowCounterClockwise, Pause, Play } from '@phosphor-icons/react'
import { useWavesurfer } from '@wavesurfer/react'

import Button from '@components/Button'

type AudioPlayerProps = HTMLAttributes<HTMLDivElement> & {
  url: string
}

function AudioPlayer({ url }: AudioPlayerProps) {
  const containerRef = useRef(null)

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
    if (!wavesurfer) return
    wavesurfer.playPause()
  }, [wavesurfer])

  const handleRestart = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.stop()
    wavesurfer.play()
  }, [wavesurfer])

  return (
    <div className="w-full mb-4">
      <div className="mb-4 w-full max-w-md mx-auto px-4" ref={containerRef}></div>
      <div className="flex items-center justify-center gap-4">
        <span className="w-12 text-center">{`${currentTime.toFixed(1)}s`}</span>
        <Button onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</Button>
        <Button onClick={handleRestart}>
          <ArrowCounterClockwise />
        </Button>
      </div>
    </div>
  )
}

export default AudioPlayer
