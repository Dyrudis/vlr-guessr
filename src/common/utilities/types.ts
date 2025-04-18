export const isAgent = (data: bundle | map | agent | ability) => data?.hasOwnProperty('role')

export const isAbility = (data: bundle | map | agent | ability) => data?.hasOwnProperty('slot')
