import { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti-boom'

import Attemps from '@components/Attempts'
import AudioPlayer from '@components/AudioPlayer'
import Browser from '@components/Browser'
import Modal, { ModalState } from '@components/Modal'
import footsteps from '@data/footsteps.json'

const numberOfAttemps = 3

function FootstepsGame() {
  const [media, setMedia] = useState<HTMLMediaElement | undefined>()
  const [answer, setAnswer] = useState<footsteps | undefined>()
  const [attemps, setAttemps] = useState<footsteps[]>([])
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  const getAttempsRemaining = useCallback(() => numberOfAttemps - attemps.length, [attemps])

  useEffect(() => {
    setAnswer(footsteps[Math.floor(Math.random() * footsteps.length)])
  }, [])

  const handleResponse = (response: bundle | map | ability | footsteps) => {
    if (hasWon !== undefined) return

    response = response as footsteps

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

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    setAnswer(
      (prev) =>
        footsteps.filter((footstep) => footstep.id !== prev?.id)[Math.floor(Math.random() * (footsteps.length - 1))]
    )
    setAttemps([])
    setHasWon(undefined)
  }

  return (
    <>
      <div className="mb-10 max-w-3xl px-4 text-center">
        <h1 className="mb-2">Whose Footsteps Are These?</h1>
        <p className="mb-4">
          There are 7 footsteps categories in Valorant, and each agent belongs to one of them. Your goal is to find out
          which group of agents the footsteps belong to by listening to the sound. You have {numberOfAttemps} attempt
          {numberOfAttemps > 1 && 's'} to guess correctly!
        </p>
      </div>
      {answer?.name && (
        <>
          <AudioPlayer url={`footsteps/sounds/${answer.id}.wav`} onReady={(media) => setMedia(media)} />
          <Attemps attemps={attemps} answer={answer} />
        </>
      )}
      {footsteps && (
        <Browser
          data={footsteps}
          onResponse={handleResponse}
          attempsRemaining={getAttempsRemaining()}
          attemps={attemps}
        />
      )}
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

export default FootstepsGame

const WinModal = ({
  answer,
  attemps,
  media,
}: {
  answer: footsteps
  attemps: footsteps[]
  media?: HTMLMediaElement
}) => {
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
        <p className="text-center mb-2">Congratulations! You found the correct footsteps!</p>
        <Attemps attemps={attemps} answer={answer} />
        {getAgentsImages(answer)}
        <AudioPlayer media={media} />
      </div>
    </>
  )
}

const LoseModal = ({
  answer,
  attemps,
  media,
}: {
  answer: footsteps
  attemps: footsteps[]
  media?: HTMLMediaElement
}) => {
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">You have used all your attempts!</p>
      <Attemps attemps={attemps} answer={answer} />
      <p className="text-center mb-2">
        The correct answer was: <span className="font-extrabold">{answer.name}</span>
      </p>
      {getAgentsImages(answer)}
      <AudioPlayer media={media} />
    </div>
  )
}

export const getAgentsImages = (footsteps: footsteps) => {
  footsteps.agentsIds.sort()
  return (
    <div className="flex items-center justify-center flex-wrap w-58 h-32 gap-4 m-4">
      {footsteps.agentsIds.map((agentId) => (
        <img
          key={agentId}
          src={`https://media.valorant-api.com/agents/${agentId}/displayicon.png`}
          alt={agentId}
          className="w-14 h-14 aspect-square"
        />
      ))}
    </div>
  )
}
