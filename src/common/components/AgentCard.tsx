type CardProps = {
  agent: agent
  onClick: (ability: ability) => void
}

function AgentCard({ agent, onClick }: CardProps) {
  const gradiantColors = agent.backgroundGradientColors.map((color) => `#${color}`)
  const gradient = `linear-gradient(165deg, ${gradiantColors.join(', ')})`

  return (
    <div className="bg-background rounded-lg p-1 max-w-3xs w-full group">
      <div>
        <div className="relative">
          <div
            className="absolute h-full w-full aspect-[175/156] mask-cover mask-center opacity-30 group-hover:opacity-100"
            style={{
              background: gradient,
              maskImage: `url(${agent.background})`,
              WebkitMaskImage: `url(${agent.background})`,
            }}
          />
          <img src={agent.icon} alt={agent.name} className={`relative m-1 mx-auto w-1/3`} />
        </div>
        <p className="text-center">{agent.name}</p>
        <div className="flex items-center justify-center mt-2 mb-1 mx-3">
          {agent.abilities.map((ability) => (
            <div
              key={ability.id}
              className="p-2 cursor-pointer opacity-60 hover:opacity-100 hover:bg-background-alt rounded-xl transition duration-200 ease-in-out"
              onClick={() => onClick(ability)}
            >
              <img src={ability.icon} alt={ability.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgentCard
