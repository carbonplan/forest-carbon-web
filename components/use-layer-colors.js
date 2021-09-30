import { useColorMode } from 'theme-ui'

export const useLayerColors = () => {
  const [mode] = useColorMode()
  const fireColor = mode === 'light' ? 'red' : 'orange'
  const earthColor = mode === 'light' ? 'green' : 'yellow'
  const waterColor = mode === 'light' ? 'blue' : 'teal'

  return {
    colors: {
      biomass: earthColor,
      'emissions-v1': fireColor,
      'sinks-v1': waterColor,
      'net-v1': 'pink',
      'emissions-v0': fireColor,
    },
  }
}

export default useLayerColors
