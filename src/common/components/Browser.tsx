import { useEffect, useState } from 'react'

import Card from '@components/Card'
import Search from '@components/Search'

type BrowserProps = {
  data: (bundle | map | agent)[]
  onResponse: (response: bundle | map | ability) => void
  attempsRemaining?: number
}

function Browser({ data, onResponse, attempsRemaining }: BrowserProps) {
  const [filteredDatas, setFilteredDatas] = useState(data)

  useEffect(() => {
    setFilteredDatas(data.sort((a, b) => a.name.localeCompare(b.name)))
  }, [data])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setFilteredDatas(data.filter((data) => data.name.toLowerCase().includes(value)))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Search onSearch={handleSearch} attempsRemaining={attempsRemaining} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 w-full max-w-6xl">
        {filteredDatas?.map((data) => (
          <div className="mx-auto" key={data.id}>
            <Card data={data} onClick={(response) => onResponse(response)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Browser
