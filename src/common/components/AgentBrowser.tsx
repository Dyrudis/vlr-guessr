import { useEffect, useState } from 'react'

import AgentCard from '@components/AgentCard'
import Search from '@components/Search'

type AgentBrowserProps = {
  agents: agent[]
  onResponse: (response: ability) => void
  attempsRemaining?: number
}

function AgentBrowser({ agents, onResponse, attempsRemaining }: AgentBrowserProps) {
  const [filteredAgents, setFilteredAgents] = useState(agents)

  useEffect(() => {
    setFilteredAgents(agents.sort((a, b) => a.name.localeCompare(b.name)))
  }, [agents])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setFilteredAgents(agents.filter((agent) => agent.name.toLowerCase().includes(value)))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Search onSearch={handleSearch} attempsRemaining={attempsRemaining} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 w-full max-w-6xl">
        {filteredAgents?.map((agent) => (
          <div className="mx-auto" key={agent.id}>
            <AgentCard agent={agent} onClick={(ability) => onResponse(ability)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgentBrowser
