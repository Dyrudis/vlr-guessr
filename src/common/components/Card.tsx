import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/Tooltip'
import { isAbility, isAgent } from '@utilities/types'

type CardProps = {
  data: bundle | map | agent | ability
  onClick: (data: bundle | map | ability) => void
}

function Card({ data, onClick }: CardProps) {
  if (isAgent(data)) {
    const agent = data as agent

    const gradientColors = agent.backgroundGradientColors.map((color) => `#${color}`)
    const gradient = `linear-gradient(165deg, ${gradientColors.join(', ')})`

    return (
      <div className="bg-background rounded-lg p-1 w-3xs group">
        <div>
          <div className="relative">
            <div
              className="absolute h-full w-full aspect-[175/156] mask-cover mask-center opacity-30 group-hover:opacity-100 transition"
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
              <TooltipProvider delayDuration={0} key={ability.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="p-2 cursor-pointer opacity-60 hover:opacity-100 hover:bg-background-alt rounded-xl"
                      onClick={() => onClick(ability)}
                    >
                      <img src={ability.icon} alt={ability.name} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="opacity-90" side='bottom'>
                    <div className="text-center w-100">
                      <p className="font-extrabold">{ability.name}</p>
                      <p>{ability.description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    )
  } else if (isAbility(data)) {
    const ability = data as ability

    return (
      <div
        key={ability.id}
        className="w-[8rem] aspect-square p-4 flex flex-col gap-4 items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:bg-background-alt rounded-xl transition"
        onClick={() => onClick(ability)}
      >
        <img className="p-2" src={ability.icon} alt={ability.name} />
        <p className="text-center">{ability.name}</p>
      </div>
    )
  } else {
    const bundleOrMap = data as bundle | map

    return (
      <div
        className="bg-background rounded-lg p-1 max-w-3xs w-full hover:bg-background-alt cursor-pointer transition"
        onClick={() => onClick(bundleOrMap)}
      >
        <div>
          <img src={bundleOrMap.image} alt={bundleOrMap.name} className="w-full h-auto aspect-[16/9] rounded-lg" />
          <p className="text-center">{bundleOrMap.name}</p>
        </div>
      </div>
    )
  }
}

export default Card
