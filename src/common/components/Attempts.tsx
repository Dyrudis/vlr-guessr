import { HeartBreak } from '@phosphor-icons/react'
import { Check } from '@phosphor-icons/react/dist/ssr'

interface AttempsProps {
  attemps: string[]
  correctAnswer: string
}

function Attemps({ attemps, correctAnswer }: AttempsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      {attemps.map((attempt, index) => (
        <div
          key={index}
          className="flex gap-2 items-center bg-primary text-background text-sm py-1 px-2 rounded-sm mb-2 whitespace-nowrap"
        >
          {attempt === correctAnswer ? <Check size={16} color="#016630" /> : <HeartBreak size={16} color="#9f0712" />}
          <span className={attempt === correctAnswer ? 'text-green-800' : 'text-red-800'}>{attempt}</span>
        </div>
      ))}
    </div>
  )
}

export default Attemps
