import { useState } from 'react'
import seedrandom from 'seedrandom'

import agents from '@data/agents.json'

const abilities = agents.flatMap((agent) => agent.abilities)

const retrieveGuesses = (): guess[] => {
  const dailies: string | null = localStorage.getItem('dailies')
  const parsedDailies: daily[] = dailies ? JSON.parse(dailies) : []
  const todayDaily: daily | undefined = parsedDailies.find((daily) => daily.date === todayString())
  if (todayDaily) {
    return todayDaily.guesses
  }
  return []
}

const retrieveDailyAbilities = (): ability[] => {
  const date = new Date()
  const seed = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString() + date.getUTCDate().toString()
  const rng = seedrandom(seed)

  const shuffledAbilities = [...abilities]
  for (let i = shuffledAbilities.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffledAbilities[i], shuffledAbilities[j]] = [shuffledAbilities[j], shuffledAbilities[i]]
  }
  return shuffledAbilities.slice(0, 5)
}

export const useDaily = () => {
  const [dailyAbilities, _] = useState<ability[]>(retrieveDailyAbilities())
  const [guesses, setGuesses] = useState<guess[]>(retrieveGuesses())

  const addGuess = (guess: guess) => {
    setGuesses((prev) => [...prev, guess])

    const dailies: string | null = localStorage.getItem('dailies')
    const parsedDailies: daily[] = dailies ? JSON.parse(dailies) : []
    const daily: daily | undefined = parsedDailies.find((daily) => daily.date === todayString()) ?? {
      date: todayString(),
      guesses: [],
    }

    daily.guesses.push(guess)

    const newDailies = parsedDailies.filter((daily) => daily.date !== todayString()).concat(daily)
    localStorage.setItem('dailies', JSON.stringify(newDailies))
  }

  const getTimeUntilNextDailyString = () => {
    const now = new Date()
    const nextDaily = new Date()
    nextDaily.setUTCHours(24, 0, 0, 0)

    const diff = nextDaily.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return { dailyAbilities, guesses, addGuess, getTimeUntilNextDailyString }
}

const getDateString = (date: Date) =>
  date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString() + date.getUTCDate().toString()

const todayString = () => getDateString(new Date())
