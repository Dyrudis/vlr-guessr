import { useEffect, useState } from 'react'

import Card from '@components/Card'
import Search from '@components/Search'
import { isAgent, isFootsteps } from '@utilities/types'

type BrowserProps = {
  data: (bundle | map | agent | footsteps)[]
  attempsRemaining?: number
  difficulty?: string
  attemps: (bundle | map | ability | footsteps | agent)[]
  onResponse: (response: bundle | map | ability | footsteps | agent) => void
  cardMode?: 'default' | 'agent'
}

const sortData = (
  data: (bundle | map | agent | footsteps)[],
  difficulty: string
): (bundle | map | agent | ability | footsteps)[] => {
  if (isFootsteps(data[0])) {
    return data.sort((a, b) => (b as footsteps).agentsIds.length - (a as footsteps).agentsIds.length)
  }
  if (difficulty === 'normal') {
    return data.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (difficulty === 'hard' && isAgent(data[0])) {
    console.log('Sorting abilities')
    return data
      .map((agent) => (agent as agent).abilities)
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name))
  }
  if (difficulty === 'hard') {
    return data.sort(() => Math.random() - 0.5)
  }
  return data
}

function Browser({ data, attempsRemaining, difficulty = 'normal', attemps, onResponse, cardMode = 'default' }: BrowserProps) {
  const [sortedDatas, setSortedDatas] = useState<(bundle | map | agent | ability | footsteps)[]>(
    sortData(data, difficulty)
  )

  useEffect(() => {
    setSortedDatas(sortData(data, difficulty))
  }, [data, difficulty])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()

    if (difficulty === 'hard' && isAgent(data[0])) {
      setSortedDatas(
        data
          .map((agent) => (agent as agent).abilities)
          .flat()
          .filter((ability) => ability.name.toLowerCase().includes(value))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    } else {
      setSortedDatas(
        data.filter((data) => data.name.toLowerCase().includes(value)).sort((a, b) => a.name.localeCompare(b.name))
      )
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Search onSearch={handleSearch} attempsRemaining={attempsRemaining} />
      <div
        className="grid w-full max-w-6xl gap-x-4 gap-y-2"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            difficulty === 'hard' && isAgent(data[0]) ? '128' : '256'
          }px, 1fr))`,
        }}
      >
        {sortedDatas?.map((data) => (
          <Card data={data} onClick={(response) => onResponse(response)} key={data.id} attemps={attemps} cardMode={cardMode} />
        ))}
      </div>
    </div>
  )
}

export default Browser
