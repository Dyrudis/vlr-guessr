import { useCallback, useEffect, useState } from 'react'

import AgentBrowser from '@components/AgentBrowser'
import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Modal, { ModalState } from '@components/Modal'
import agents from '@data/agents.json'

const numberOfAttemps = 3

function AbilityGame() {
  const [answer, setAnswer] = useState<ability | undefined>()
  const [attemps, setAttemps] = useState<ability[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [attemps])

  useEffect(() => {
    setAnswer(agents[Math.floor(Math.random() * agents.length)].abilities[Math.floor(Math.random() * 4)])
  }, [])

  const handleResponse = (response: ability) => {
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
      (prev) =>
        agents.filter((agent) => agent.id !== prev?.agentId)[Math.floor(Math.random() * agents.length)].abilities[
          Math.floor(Math.random() * 4)
        ]
    )
    setAttemps([])
    setHasWon(undefined)
  }

  return (
    <>
      <h1 className="text-center mb-2 max-w-2xl px-4">Find the ability based on the sound</h1>
      <p className="mb-16 max-w-2xl px-4">You have 3 attemps to try to find the correct ability, will you succeed?</p>
      {answer?.name && (
        <>
          <AudioPlayer url={`abilities/${answer.agentId}/${answer.id}.wav`} />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {agents && <AgentBrowser agents={agents} onResponse={handleResponse} attempsRemaining={getAttempsRemaining()} />}
      <Modal {...modalState} onClose={handleCloseModal}>
        {hasWon ? <WinModal answer={answer!} attemps={attemps} /> : <LoseModal answer={answer!} attemps={attemps} />}
      </Modal>
    </>
  )
}

export default AbilityGame

const WinModal = ({ answer, attemps }: { answer: ability; attemps: ability[] }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">Congratulations! You found the correct ability!</p>
      <Attemps attemps={attemps} answer={answer} />
      <img src={answer.icon} alt={answer.name} className="px-4 w-1/2 mb-4" />
      <AudioPlayer url={`abilities/${answer.agentId}/${answer.id}.wav`} />
    </div>
  )
}

const LoseModal = ({ answer, attemps }: { answer: ability; attemps: ability[] }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      <img src={answer.icon} alt={answer.name} className="px-4 w-1/2 mb-4" />
      <AudioPlayer url={`abilities/${answer.agentId}/${answer.id}.wav`} />
    </div>
  )
}
