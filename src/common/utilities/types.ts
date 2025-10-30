export const isAgent = (data: bundle | map | agent | ability | footsteps) => data?.hasOwnProperty('role')

export const isAbility = (data: bundle | map | agent | ability | footsteps) => data?.hasOwnProperty('slot')

export const isFootsteps = (data: bundle | map | agent | ability | footsteps) => data?.hasOwnProperty('agentsIds')
