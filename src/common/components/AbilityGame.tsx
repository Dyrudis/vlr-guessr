import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti-boom'

import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import DifficultySelect from '@components/DifficultySelect'
import Modal, { ModalState } from '@components/Modal'
import agents from '@data/agents.json'

function AbilityGame() {
  const [media, setMedia] = useState<HTMLMediaElement | undefined>()
  const [difficulty, setDifficulty] = useState<string>('normal')
  const [numberOfAttemps, setNumberOfAttemps] = useState<number>(3)
  const [answer, setAnswer] = useState<ability | undefined>()
  const [attemps, setAttemps] = useState<ability[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [numberOfAttemps, attemps])

  useEffect(() => {
    setNumberOfAttemps(3)
    restartGame()
  }, [difficulty])

  useEffect(() => {
    setAnswer(agents[Math.floor(Math.random() * agents.length)].abilities[Math.floor(Math.random() * 4)])
  }, [])

  const handleResponse = (response: bundle | map | ability | footsteps) => {
    if (hasWon !== undefined) return

    response = response as ability

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
      }
    }
  }

  const restartGame = () => {
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
      <div className="mb-10 max-w-3xl px-4 text-center">
        <h1 className="mb-2">What's The Ability?</h1>
        <p className="mb-4">
          Each agent in the game has 4 unique abilities that produce distinct sounds. You have {numberOfAttemps} attempt
          {numberOfAttemps > 1 && 's'} to try to find the correct ability, but you can only hear it.
        </p>
        <DifficultySelect setDifficulty={setDifficulty} difficulties={['normal', 'hard']} />
      </div>
      {answer?.name && (
        <>
          <AudioPlayer url={`abilities/${answer.agentId}/${answer.id}.wav`} onReady={(media) => setMedia(media)} />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {agents && (
        <Browser
          data={agents}
          onResponse={handleResponse}
          attempsRemaining={getAttempsRemaining()}
          difficulty={difficulty}
          attemps={attemps}
        />
      )}
      <Modal {...modalState} onClose={restartGame}>
        {hasWon ? (
          <>
            <WinModal answer={answer!} attemps={attemps} media={media} />
          </>
        ) : (
          <LoseModal answer={answer!} attemps={attemps} media={media} />
        )}
      </Modal>
    </>
  )
}

export default AbilityGame

const WinModal = ({ answer, attemps, media }: { answer: ability; attemps: ability[]; media?: HTMLMediaElement }) => {
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
        <p className="text-center mb-2">Congratulations! You found the correct ability!</p>
        <Attemps attemps={attemps} answer={answer} />
        <img src={answer.icon} alt={answer.name} className="px-4 w-1/2 mb-4" />
        <AudioPlayer media={media} />
      </div>
    </>
  )
}

const LoseModal = ({ answer, attemps, media }: { answer: ability; attemps: ability[]; media?: HTMLMediaElement }) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      <img src={answer.icon} alt={answer.name} className="px-4 w-1/2 mb-4" />
      <AudioPlayer media={media} />
    </div>
  )
}
