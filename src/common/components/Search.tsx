import { Heart, MagnifyingGlass } from '@phosphor-icons/react'

import Button from '@components/Button'

interface SearchProps {
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  attempsRemaining?: number
}

function Search({ onSearch, attempsRemaining }: SearchProps) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-background-alt rounded-lg">
      <Button>
        <MagnifyingGlass />
      </Button>
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 text-primary bg-transparent border-none focus:outline-none"
        onChange={onSearch}
      />
      {attempsRemaining && (
        <span className="mr-2 flex items-center justify-center">
          {attempsRemaining}
          <Heart weight="fill" className="ml-1" />
        </span>
      )}
    </div>
  )
}

export default Search
