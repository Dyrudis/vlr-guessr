import { useEffect, useState } from 'react'

import Card from '@components/Card'
import Search from '@components/Search'
import { isAgent } from '@utilities/types'

type BrowserProps = {
  data: (bundle | map | agent)[]
  attempsRemaining?: number
  difficulty?: string
  onResponse: (response: bundle | map | ability) => void
}

function Browser({ data, attempsRemaining, difficulty = 'normal', onResponse }: BrowserProps) {
  const [sortedDatas, setSortedDatas] = useState<(bundle | map | agent | ability)[]>(data)

  useEffect(() => {
    if (difficulty === 'normal') {
      setSortedDatas(data.sort((a, b) => a.name.localeCompare(b.name)))
    }
    if (difficulty === 'hard') {
      setSortedDatas(data.sort(() => Math.random() - 0.5))
    }
    if (difficulty === 'hard' && isAgent(data[0])) {
      setSortedDatas(
        data
          .map((agent) => (agent as agent).abilities)
          .flat()
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    }
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
          <Card data={data} onClick={(response) => onResponse(response)} key={data.id} />
        ))}
      </div>
    </div>
  )
}

export default Browser
