import { useEffect, useState } from 'react'

import { useDaily } from '../hooks/useDaily'
import AudioPlayer from './AudioPlayer'
import Browser from './Browser'
import agents from '@data/agents.json'
import Button from './Button'
import { House, Share } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'
import Confetti from 'react-confetti-boom'
import Modal, { ModalState } from './Modal'

const calculateScore = (guesses: guess[]) => {
  let score = 0
  guesses.forEach((guess) => {
    if (guess.isCorrectAbility) {
      score += 100
    } else if (guess.isCorrectAgent) {
      score += 25
    }
  })
  return score
}

function DailyGame() {
  const navigate = useNavigate()
  const { dailyAbilities, guesses, addGuess, getTimeUntilNextDailyString } = useDaily()
  const [timeUntilNext, setTimeUntilNext] = useState(getTimeUntilNextDailyString())
  const [hasWon, setHasWon] = useState<boolean | undefined>()
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Game Over',
    children: <></>,
  })

  useEffect(() => {
    if (guesses.length >= dailyAbilities.length) {
      const timer = setInterval(() => {
        setTimeUntilNext(getTimeUntilNextDailyString())
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [guesses, dailyAbilities, getTimeUntilNextDailyString])

  const handleResponse = (response: bundle | map | ability | footsteps | agent) => {
    const isCorrectAgent = (response as ability).agentId === currentAbility.agentId

    const guess: guess = {
      id: currentAbility.id,
      guessedId: response.id,
      isCorrectAbility: response.id === currentAbility.id,
      isCorrectAgent: isCorrectAgent,
    }
    addGuess(guess)

    setHasWon(guess.isCorrectAbility)
    if (guess.isCorrectAbility) {
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        title: '🟩 Correct Guess',
      }))
    } else {
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        title: isCorrectAgent ? '🟨 Wrong Guess' : '🟥 Wrong Guess',
      }))
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleShare = () => {
    const score = calculateScore(guesses)
    let text = `I scored ${score}/500 in today's valorant-guessr Daily Challenge!\n`
    guesses.forEach((guess, _) => {
      const symbol = guess.isCorrectAbility ? '🟩' : guess.isCorrectAgent ? '🟨' : '🟥'
      text += `${symbol} `
    })
    text += `\nCan you beat my score? https://vlr-guessr.pages.dev/daily`
    navigator.clipboard.writeText(text)
    alert('Score copied to clipboard!')
  }

  const isGameOver = guesses.length >= dailyAbilities.length
  const currentIndex = guesses.length
  const currentAbility = dailyAbilities[currentIndex]

  if (isGameOver) {
    return (
      <>
        <div className="mb-10 max-w-3xl px-4 text-center">
          <h1 className="mb-2">Daily Mode</h1>
          <p>You scored {calculateScore(guesses)}/500</p>
          <div className="flex items-center justify-center gap-2 my-2">
            <Button variant="primary" onClick={handleShare} className="flex items-center justify-center gap-2">
              <Share size={20} />
              Share my score
            </Button>
            <Button className="flex items-center justify-center gap-2" onClick={() => navigate('/')}>
              <House />
              Change mode
            </Button>
          </div>
          <p>Come back in {timeUntilNext} for the next challenge!</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 px-8 mb-16">
          {guesses.map((guess, index) => {
            const ability = dailyAbilities[index]
            const guessedAbility = agents
              .find((agent) => agent.abilities.some((ability) => ability.id === guess.guessedId))
              ?.abilities.find((ability) => ability.id === guess.guessedId)
            const guessedAgent = agents.find((agent) => agent.id === guessedAbility?.agentId)
            const correctAgent = agents.find((agent) => agent.id === ability.agentId)
            return (
              <div key={index} className="border p-6 rounded flex flex-col items-center">
                <p>
                  {guess.isCorrectAbility ? '🟩' : guess.isCorrectAgent ? '🟨' : '🟥'} {index + 1}/5 -{' '}
                  {correctAgent?.name}'s <strong>{ability.name}</strong>{' '}
                  {guess.isCorrectAbility ? '(+100 pts)' : guess.isCorrectAgent ? '(+25 pts)' : '(+0 pts)'}
                </p>
                <img src={ability.icon} alt={ability.name} className="px-4 w-24 mb-2" />
                <AudioPlayer url={`abilities/${ability.agentId}/${ability.id}.wav`} />
                {!guess.isCorrectAbility && (
                  <>
                    <p className="mt-12">
                      You guessed {guessedAgent?.name}'s <strong>{guessedAbility?.name}</strong>
                    </p>
                    <img src={guessedAbility?.icon} alt={guessedAbility?.name} className="px-4 w-24 mb-2" />
                    <AudioPlayer url={`abilities/${guessedAbility?.agentId}/${guessedAbility?.id}.wav`} />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-10 max-w-3xl px-4 text-center">
        <h1 className="mb-2">Daily Mode</h1>
        <p className="mb-4">
          5 abilities will be played each day. You gain 100 points for each correct guess, and 25 points if you found
          the correct agent but not the ability.
        </p>
        <h3>{guesses.length + 1}/5</h3>
      </div>
      {currentAbility?.name && <AudioPlayer url={`abilities/${currentAbility.agentId}/${currentAbility.id}.wav`} />}
      <br className="my-8" />
      {agents && <Browser data={agents} onResponse={handleResponse} attemps={[]} />}
      <Modal {...modalState} dailyMode={true} onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}>
        {hasWon ? (
          <>
            <WinModal guess={guesses[guesses.length - 1]} />
          </>
        ) : (
          <LoseModal guess={guesses[guesses.length - 1]} />
        )}
      </Modal>
    </>
  )
}

export default DailyGame

const WinModal = ({ guess }: { guess: guess }) => {
  const allAbilities = agents.flatMap((agent) =>
    agent.abilities.map((ability) => ({ ...ability, agentName: agent.name }))
  )
  const ability = allAbilities.find((a) => a.id === guess.id)

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
        <p className="text-center mb-2">
          You found the correct ability: {ability?.agentName}'s <strong>{ability?.name}</strong>
        </p>
        <img src={ability?.icon} alt={ability?.name} className="px-4 w-32 mb-4" />
        <AudioPlayer url={`abilities/${ability?.agentId}/${ability?.id}.wav`} />
      </div>
    </>
  )
}

const LoseModal = ({ guess }: { guess: guess }) => {
  const allAbilities = agents.flatMap((agent) =>
    agent.abilities.map((ability) => ({ ...ability, agentName: agent.name }))
  )
  const correctAbility = allAbilities.find((a) => a.id === guess.id)
  const guessedAbility = allAbilities.find((a) => a.id === guess.guessedId)
  return (
    <div className="flex flex-col items-center relative">
      <p className="text-center mb-2">
        The correct answer was: {correctAbility?.agentName}'s <strong>{correctAbility?.name}</strong>
      </p>
      <img src={correctAbility?.icon} alt={correctAbility?.name} className="px-4 w-20 mb-1 md:w-32 md:mb-4" />
      <AudioPlayer url={`abilities/${correctAbility?.agentId}/${correctAbility?.id}.wav`} />

      <p className="text-center mt-8 mb-2">
        You guessed: {guessedAbility?.agentName}'s <strong>{guessedAbility?.name}</strong>
      </p>
      <img src={guessedAbility?.icon} alt={guessedAbility?.name} className="px-4 w-20 mb-1 md:w-32 md:mb-4" />
      <AudioPlayer url={`abilities/${guessedAbility?.agentId}/${guessedAbility?.id}.wav`} />
    </div>
  )
}
