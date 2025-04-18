import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/Select'

type DifficultySelectProps = {
  setDifficulty: (difficulty: string) => void
  difficulties?: string[]
}

function DifficultySelect({ setDifficulty, difficulties = ['normal', 'hard', 'infinite'] }: DifficultySelectProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-sm font-semibold">Difficulty:</label>
      <div className="w-25">
        <Select defaultValue={difficulties[0]} onValueChange={setDifficulty}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default DifficultySelect
