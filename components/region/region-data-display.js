import { Box } from 'theme-ui'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

import { useRegionContext } from './context'

export const RegionDataDisplay = ({ children, sx }) => {
  const { showRegionPicker, setShowRegionPicker, regionData } =
    useRegionContext()

  return (
    <>
      <Box
        sx={{
          ...sx.heading,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover > #expander': { stroke: 'secondary' },
            '&:hover > #label': { color: 'secondary' },
          },
        }}
        onClick={() => setShowRegionPicker(!showRegionPicker)}
      >
        <Box
          as='span'
          id='label'
          sx={{ color: 'primary', transition: 'color 0.15s' }}
        >
          Inspect region
        </Box>
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker && regionData ? 'auto' : 0}
        easing={'linear'}
      >
        {showRegionPicker ? children : <div />}
      </AnimateHeight>
    </>
  )
}

export default RegionDataDisplay
