import { UseQueryOptions } from '@tanstack/react-query'

const bundlesQuery: UseQueryOptions<bundleData[]> = {
  queryKey: ['bundles'],
  queryFn: async () => {
    const response = await fetch('/src/common/data/bundles.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  },
  refetchOnWindowFocus: false,
}

export default bundlesQuery
