import { useCallback, useEffect, useState } from 'react'

import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import Modal, { ModalState } from '@components/Modal'
import bundles from '@data/bundles.json'

const numberOfAttemps = 3

function AceGame() {
  const [answer, setAnswer] = useState<bundle | undefined>()
  const [attemps, setAttemps] = useState<bundle[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [attemps])

  useEffect(() => {
    setAnswer(bundles[Math.floor(Math.random() * bundles.length)])
  }, [])

  const handleResponse = (response: bundle) => {
    if (hasWon !== undefined) return

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
    setAnswer(
      (prev) => bundles.filter((bundle) => bundle.id !== prev?.id)[Math.floor(Math.random() * (bundles.length - 1))]
    )
    setAttemps([])
    setHasWon(undefined)
  }

  return (
    <>
      <h1 className="text-center mb-2 max-w-2xl px-4">Find the skin bundle based on the ace sound</h1>
      <p className="mb-16 max-w-2xl px-4">You have 3 attemps to try to find the correct bundle, will you succeed?</p>
      {answer?.name && (
        <>
          <AudioPlayer url={`aces/${answer.id}.mp3`} />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {bundles && <Browser data={bundles} onResponse={handleResponse} attempsRemaining={getAttempsRemaining()} />}
      <Modal {...modalState} onClose={handleCloseModal}>
        {hasWon ? <WinModal answer={answer!} attemps={attemps} /> : <LoseModal answer={answer!} attemps={attemps} />}
      </Modal>
    </>
  )
}

export default AceGame

const WinModal = ({ answer, attemps }: { answer: bundle; attemps: bundle[] }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">Congratulations! You found the correct bundle!</p>
      <Attemps attemps={attemps} answer={answer} />
      <img src={answer.image} alt={answer.name} className="px-4 h-auto mb-4" />
      <AudioPlayer url={`aces/${answer.id}.mp3`} />
    </div>
  )
}

const LoseModal = ({ answer, attemps }: { answer: bundle; attemps: bundle[] }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      <img src={answer.image} alt={answer.name} className="px-4 h-auto mb-4" />
      <AudioPlayer url={`aces/${answer.id}.mp3`} />
    </div>
  )
}
