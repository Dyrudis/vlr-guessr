import { useState } from 'react'

import Skeleton from '@components/Skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/Tooltip'
import { isAbility, isAgent, isFootsteps } from '@utilities/types'

import { getAgentsImages } from './FootstepsGame'

type CardProps = {
  data: bundle | map | agent | ability | footsteps
  attemps: (bundle | map | ability | footsteps)[]
  onClick: (data: bundle | map | ability | footsteps) => void
}

function Card({ data, attemps, onClick }: CardProps) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  if (isAgent(data)) {
    const agent = data as agent

    const gradientColors = agent.backgroundGradientColors.map((color) => `#${color}`)
    const gradient = `linear-gradient(165deg, ${gradientColors.join(', ')})`

    return (
      <div className="bg-background rounded-lg p-1 w-3xs group mx-auto">
        {isLoading && <SkeletonAgent />}
        <div className={isLoading ? 'hidden' : ''}>
          <div className="relative">
            <div
              className="absolute h-full w-full mask-cover mask-center opacity-30 group-hover:opacity-100 transition"
              style={{
                background: gradient,
                maskImage: `url(${agent.background})`,
                WebkitMaskImage: `url(${agent.background})`,
              }}
            />
            <img
              src={agent.icon}
              alt={agent.name}
              className={`relative m-1 mx-auto w-1/3`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <p className="text-center">{agent.name}</p>
          <div className="flex items-center justify-center mt-2 mb-1 mx-3">
            {agent.abilities.map((ability) => {
              const hasBeenTried = attemps.some((attempt) => attempt.id === ability.id)
              return (
                <TooltipProvider delayDuration={0} key={ability.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`p-2 rounded-xl
                        ${
                          hasBeenTried
                            ? 'opacity-20'
                            : 'opacity-65 hover:opacity-100 cursor-pointer hover:bg-background-alt '
                        }`}
                        onClick={() => (hasBeenTried ? undefined : onClick(ability))}
                      >
                        <img src={ability.icon} alt={ability.name} />
                      </div>
                    </TooltipTrigger>
                    {!hasBeenTried && (
                      <TooltipContent className="opacity-90" side="bottom">
                        <div className="text-center w-auto">
                          <p className="font-extrabold">{ability.name}</p>
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </div>
      </div>
    )
  } else if (isAbility(data)) {
    const ability = data as ability
    const hasBeenTried = attemps.some((attempt) => attempt.id === ability.id)

    return (
      <div
        key={ability.id}
        className={`mx-auto w-[8rem] aspect-square p-4 flex flex-col items-center justify-center rounded-xl transition ${
          hasBeenTried ? 'opacity-20' : 'opacity-65 hover:opacity-100 cursor-pointer hover:bg-background-alt '
        }`}
        onClick={() => (hasBeenTried ? undefined : onClick(ability))}
      >
        {isLoading && <SkeletonAbility />}
        <div className={isLoading ? 'hidden' : ''}>
          <img className="p-2 mb-4" src={ability.icon} alt={ability.name} onLoad={() => setIsLoading(false)} />
          <p className="text-center">{ability.name}</p>
        </div>
      </div>
    )
  } else if (isFootsteps(data)) {
    const footsteps = data as footsteps
    const hasBeenTried = attemps.some((attempt) => attempt.id === footsteps.id)

    return (
      <div
        className={`mx-auto bg-background rounded-lg p-1 max-w-3xs w-full transition flex flex-col items-center justify-center ${
          hasBeenTried ? 'opacity-20 grayscale' : 'cursor-pointer hover:bg-background-alt '
        }`}
        onClick={() => (hasBeenTried ? undefined : onClick(footsteps))}
      >
        {getAgentsImages(footsteps)}
        <p className="text-center">{footsteps.name}</p>
      </div>
    )
  } else {
    const bundleOrMap = data as bundle | map
    const hasBeenTried = attemps.some((attempt) => attempt.id === bundleOrMap.id)

    return (
      <div
        className={`mx-auto bg-background rounded-lg p-1 max-w-3xs w-full transition
        ${hasBeenTried ? 'opacity-20 grayscale' : 'cursor-pointer hover:bg-background-alt '}`}
        onClick={() => (hasBeenTried ? undefined : onClick(bundleOrMap))}
      >
        {isLoading && <SkeletonBundleOrMap />}
        <div className={isLoading ? 'hidden' : ''}>
          <img
            src={bundleOrMap.image}
            alt={bundleOrMap.name}
            onLoad={() => setIsLoading(false)}
            className="w-full h-auto aspect-[16/9] rounded-lg"
          />
        </div>
        <p className="text-center">{bundleOrMap.name}</p>
      </div>
    )
  }
}

const SkeletonAbility = () => (
  <>
    <Skeleton className="min-w-full w-full h-auto aspect-square mb-4" />
    <Skeleton className="w-20 h-4 mx-auto" />
  </>
)

const SkeletonAgent = () => (
  <>
    <Skeleton className="min-w-full w-full h-auto aspect-[3/1] mb-2" />
    <Skeleton className="w-20 h-4 mx-auto" />
    <div className="flex items-center justify-center gap-4 p-2 mb-3.5">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="aspect-square w-full" />
    </div>
  </>
)

const SkeletonBundleOrMap = () => <Skeleton className="min-w-full w-full h-auto aspect-[16/9] mb-2" />

export default Card
