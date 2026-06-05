import { useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import AudioPlayer from '@components/AudioPlayer'
import Button from '@components/Button'

type AudioCarouselItem = {
  url: string
  title?: string
}

type AudioCarouselProps = {
  sounds: AudioCarouselItem[]
  initialIndex?: number
  autoPlay?: boolean
  onIndexChange?: (index: number) => void
}

function AudioCarousel({ sounds, initialIndex = 0, autoPlay = false, onIndexChange }: AudioCarouselProps) {
  const [index, setIndex] = useState(() => Math.min(Math.max(initialIndex, 0), Math.max(sounds.length - 1, 0)))

  useEffect(() => {
    if (sounds.length === 0) return
    setIndex((prev) => Math.min(Math.max(prev, 0), sounds.length - 1))
  }, [sounds])

  if (sounds.length === 0) return null

  const current = sounds[index]

  const goPrev = () => {
    if (index === 0) return
    const nextIndex = index - 1
    setIndex(nextIndex)
    onIndexChange?.(nextIndex)
  }

  const goNext = () => {
    if (index === sounds.length - 1) return
    const nextIndex = index + 1
    setIndex(nextIndex)
    onIndexChange?.(nextIndex)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Button onClick={goPrev} aria-label="Previous sound" disabled={index === 0}>
          <CaretLeft />
        </Button>
        <div className="flex-1 text-center font-semibold">
          {current.title ? current.title : `Sound ${index + 1}/${sounds.length}`}
        </div>
        <Button onClick={goNext} aria-label="Next sound" disabled={index === sounds.length - 1}>
          <CaretRight />
        </Button>
      </div>
      <AudioPlayer key={current.url} url={current.url} autoPlay={autoPlay} />
    </div>
  )
}

export default AudioCarousel
