import { HeartBreak } from '@phosphor-icons/react'
import { Check } from '@phosphor-icons/react/dist/ssr'

type AttempsProps = {
  attemps: (bundle | map | ability | footsteps)[]
  answer: bundle | map | ability | footsteps
}

function Attemps({ attemps, answer: correctAnswer }: AttempsProps) {
  const isCorrect = (attempt: bundle | map | ability | footsteps) => {
    return attempt.id === correctAnswer.id
  }

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-0 mb-2 min-h-9">
      {attemps.map((attempt, index) => (
        <div
          key={index}
          className="flex gap-2 items-center bg-primary text-background text-sm py-1 px-2 rounded-sm mb-2 whitespace-nowrap"
        >
          {isCorrect(attempt) ? <Check size={16} color="#016630" /> : <HeartBreak size={16} color="#9f0712" />}
          <span className={isCorrect(attempt) ? 'text-green-800' : 'text-red-800'}>{attempt.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Attemps
