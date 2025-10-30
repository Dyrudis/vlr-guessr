import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti-boom'

import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import Modal, { ModalState } from '@components/Modal'
import maps from '@data/maps.json'

const numberOfAttemps = 3

function MapGame() {
  const [media, setMedia] = useState<HTMLMediaElement | undefined>()
  const [answer, setAnswer] = useState<map | undefined>()
  const [attemps, setAttemps] = useState<map[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [attemps])

  useEffect(() => {
    setAnswer(maps[Math.floor(Math.random() * maps.length)])
  }, [])

  const handleResponse = (response: bundle | map | ability) => {
    if (hasWon !== undefined) return

    response = response as map

    setAttemps((prev) => [...prev, response])

    if (response.id === answer?.id) {
      setHasWon(true)
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        title: 'You Won!',
      }))
    } else {
      if (getAttempsRemaining() <= 1) {
        setHasWon(false)
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          title: 'Game Over',
        }))
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    setAnswer((prev) => maps.filter((map) => map.id !== prev?.id)[Math.floor(Math.random() * (maps.length - 1))])
    setAttemps([])
    setHasWon(undefined)
  }

  return (
    <>
      <div className="mb-10 max-w-3xl px-4 text-center">
        <h1 className="mb-2">What's the map?</h1>
        <p className="mb-4">
          You have {numberOfAttemps} attempt{numberOfAttemps > 1 && 's'} to try to find the correct map, but you can
          only hear the theme playing when a game starts
        </p>
      </div>
      {answer?.name && (
        <>
          <AudioPlayer url={`maps/sounds/${answer.id}.mp3`} onReady={(media) => setMedia(media)} />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {maps && <Browser data={maps} onResponse={handleResponse} attempsRemaining={getAttempsRemaining()} />}
      <Modal {...modalState} onClose={handleCloseModal}>
        {hasWon ? (
          <WinModal answer={answer!} attemps={attemps} media={media} />
        ) : (
          <LoseModal answer={answer!} attemps={attemps} media={media} />
        )}
      </Modal>
    </>
  )
}

export default MapGame

const WinModal = ({ answer, attemps, media }: { answer: map; attemps: map[]; media?: HTMLMediaElement }) => {
  return (
    <>
      <Confetti
        particleCount={60}
        spreadDeg={60}
        x={0.35}
        y={0.4}
        deg={-135}
        launchSpeed={1.5}
        colors={['#FF7777', '#77FF77', '#7777FF', '#FFFF77', '#FF77FF', '#77FFFF']}
      />
      <Confetti
        particleCount={60}
        spreadDeg={60}
        x={0.65}
        y={0.4}
        deg={-45}
        launchSpeed={1.5}
        colors={['#FF7777', '#77FF77', '#7777FF', '#FFFF77', '#FF77FF', '#77FFFF']}
      />
      <div className="flex flex-col items-center relative">
        <p className="text-center mb-2">Congratulations! You found the correct map!</p>
        <Attemps attemps={attemps} answer={answer} />
        <img src={answer.image} alt={answer.name} className="px-4 h-auto mb-4" />
        <AudioPlayer media={media} />
      </div>
    </>
  )
}

const LoseModal = ({ answer, attemps, media }: { answer: map; attemps: map[]; media?: HTMLMediaElement }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      <img src={answer.image} alt={answer.name} className="px-4 h-auto mb-4" />
      <AudioPlayer media={media} />
    </div>
  )
}
