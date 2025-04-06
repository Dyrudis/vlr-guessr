import { useEffect, useState } from 'react'

import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import Modal from '@components/Modal'
import bundles from '@data/bundles.json'

function FinisherGame() {
  const [randomPick, setRandomPick] = useState<bundleData | null | undefined>(null)
  const [attempsRemaining, setAttempsRemaining] = useState(3)
  const [attemps, setAttemps] = useState<string[]>([])
  const [canPlay, setCanPlay] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalText, setModalText] = useState<React.ReactNode>()

  useEffect(() => {
    if (bundles) {
      const randomIndex = Math.floor(Math.random() * bundles.length)
      setRandomPick(bundles.at(randomIndex))
    }
  }, [bundles])

  const handleResponse = (response: string) => {
    if (!canPlay) return

    setAttemps((prev) => [...prev, response])

    if (response === randomPick?.displayName) {
      setCanPlay(false)
    } else {
      setAttempsRemaining((prev) => prev - 1)

      if (attempsRemaining <= 1) {
        setCanPlay(false)
        setModalText(
          <p>
            You lost! The correct answer was <span className="font-extrabold">{randomPick?.displayName}</span>.
          </p>
        )
        setModalOpen(true)
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <h1 className="text-center mb-2 max-w-2xl px-4">Find the skin bundle based on the finisher sound</h1>
      <p className="mb-16 max-w-2xl px-4">You have 3 attemps to try to find the correct bundle, will you succeed?</p>
      {randomPick?.displayName && (
        <>
          <AudioPlayer url={`finishers/${randomPick.displayName} Kill 5.mp3`} />
          <Attemps attemps={attemps} correctAnswer={randomPick.displayName} />
        </>
      )}
      {bundles && <Browser data={bundles} onResponse={handleResponse} attempsRemaining={attempsRemaining} />}
      <Modal isOpen={modalOpen} title={'Game Over'} onClose={() => setModalOpen(false)}>
        {modalText}
      </Modal>
    </>
  )
}

export default FinisherGame
