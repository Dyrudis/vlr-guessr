import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti-boom'

import Attemps from '@components/Attempts'
import Browser from '@components/Browser'
import Modal, { ModalState } from '@components/Modal'
import agents from '@data/agents.json'
import AudioCarousel from './AudioCarousel'

const numberOfAttemps = 3

const voicelines = [
  { id: 'death', label: 'Death', index: 0 },
  { id: 'hello', label: 'Hello', index: 1 },
  { id: 'pickme', label: 'Agent Select', index: 2 },
] as const

type VoicelineId = (typeof voicelines)[number]['id']

function VoicelineGame() {
  const [answer, setAnswer] = useState<agent | undefined>()
  const [attemps, setAttemps] = useState<agent[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [voicelineIndex, setVoicelineIndex] = useState(0)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [attemps])

  useEffect(() => {
    setAnswer(agents[Math.floor(Math.random() * agents.length)])
  }, [])

  const handleResponse = (response: bundle | map | ability | footsteps | agent) => {
    if (hasWon !== undefined) return

    response = response as agent

    setAttemps((prev) => [...prev, response])

    if (response.id === answer?.id) {
      setHasWon(true)
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        title: 'You Won!',
      }))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      if (getAttempsRemaining() <= 1) {
        setHasWon(false)
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          title: 'Game Over',
        }))

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        setVoicelineIndex((prev) => Math.min(prev + 1, voicelines.length - 1))
      }
    }
  }

  const restartGame = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    setAnswer((prev) => {
      const remainingAgents = agents.filter((agent) => agent.id !== prev?.id)
      return remainingAgents[Math.floor(Math.random() * remainingAgents.length)]
    })
    setAttemps([])
    setHasWon(undefined)
    setVoicelineIndex(0)
  }

  const currentVoicelineId = voicelines[Math.min(voicelineIndex, voicelines.length - 1)].id as VoicelineId

  return (
    <>
      <div className="mb-10 max-w-3xl px-4 text-center">
        <h1 className="mb-2">Whose Voiceline Is This?</h1>
        <p className="mb-4">
          3 voicelines will be played, from hardest to easiest (death, hello and agent select). You have{' '}
          {numberOfAttemps} attempt
          {numberOfAttemps > 1 && 's'} to guess the correct agent.
        </p>
      </div>
      {answer?.name && (
        <>
          <AudioCarousel
            key={`${answer.id}-${currentVoicelineId}`}
            sounds={voicelines.slice(0, voicelineIndex + 1).map((voiceline) => ({
              title: `${voiceline.label} (${voiceline.index + 1}/${voicelines.length})`,
              url: `voicelines/${answer.id}/${voiceline.id}.wav`,
            }))}
            initialIndex={voicelineIndex}
            autoPlay
          />
          <br className="my-8" />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {agents && (
        <Browser
          data={agents}
          onResponse={handleResponse}
          attempsRemaining={getAttempsRemaining()}
          attemps={attemps}
          cardMode="agent"
        />
      )}
      <Modal {...modalState} onClose={restartGame}>
        {hasWon ? <WinModal answer={answer!} attemps={attemps} /> : <LoseModal answer={answer!} attemps={attemps} />}
      </Modal>
    </>
  )
}

export default VoicelineGame

const WinModal = ({ answer, attemps }: { answer: agent; attemps: agent[] }) => {
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
        <p className="text-center mb-2">You found the correct agent!</p>
        <Attemps attemps={attemps} answer={answer} />
        <img src={answer.icon} alt={answer.name} className="px-4 w-32 mb-4" />
      </div>
      <AudioCarousel
        sounds={voicelines.map((voiceline) => ({
          title: `${voiceline.label} (${voiceline.index + 1}/${voicelines.length})`,
          url: `voicelines/${answer.id}/${voiceline.id}.wav`,
        }))}
        initialIndex={0}
        autoPlay
      />
    </>
  )
}

const LoseModal = ({ answer, attemps }: { answer: agent; attemps: agent[] }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      <img src={answer.icon} alt={answer.name} className="px-4 w-32 mb-4" />
      <AudioCarousel
        sounds={voicelines.map((voiceline) => ({
          title: `${voiceline.label} (${voiceline.index + 1}/${voicelines.length})`,
          url: `voicelines/${answer.id}/${voiceline.id}.wav`,
        }))}
        initialIndex={0}
        autoPlay
      />
    </div>
  )
}
