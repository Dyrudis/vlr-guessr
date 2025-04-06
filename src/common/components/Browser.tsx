import { useEffect, useState } from 'react'

import BundleCard from '@components/BundleCard'
import Search from '@components/Search'

type BrowserProps = {
  data: bundle[]
  onResponse: (response: bundle) => void
  attempsRemaining?: number
}

function Browser({ data, onResponse, attempsRemaining }: BrowserProps) {
  const [filteredBundles, setFilteredBundles] = useState(data)

  useEffect(() => {
    setFilteredBundles(data.sort((a, b) => a.name.localeCompare(b.name)))
  }, [data])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setFilteredBundles(data.filter((bundle) => bundle.name.toLowerCase().includes(value)))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Search onSearch={handleSearch} attempsRemaining={attempsRemaining} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 w-full max-w-6xl">
        {filteredBundles?.map((bundle) => (
          <div className="mx-auto" onClick={() => onResponse(bundle)} key={bundle.id}>
            <BundleCard bundle={bundle} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Browser
