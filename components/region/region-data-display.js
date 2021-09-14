import { Box } from 'theme-ui'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

import { RecenterButton } from './recenter-button'
import { useRegionContext } from './context'

export const RegionDataDisplay = ({ sx }) => {
  const { showRegionPicker, setShowRegionPicker, regionData } =
    useRegionContext()

  let content
  if (showRegionPicker) {
    if (!regionData || regionData.loading) {
      content = 'loading...'
    } else {
      const sum = regionData.value.value
        .filter((d) => !Number.isNaN(d))
        .reduce((a, d) => a + d, 0)
      content = (
        <>
          <Box
            as='span'
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              color: 'secondary',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: [1] }}>Recenter map</Box>
            <RecenterButton color='secondary' />
          </Box>
          total: {sum.toFixed(2)}
        </>
      )
    }
  }

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
          Region data
        </Box>
        <Expander
          value={showRegionPicker}
          id='expander'
          sx={{ position: 'relative' }}
        />
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker && regionData ? 'auto' : 0}
        easing={'linear'}
      >
        {content || <div />}
      </AnimateHeight>
    </>
  )
}

export default RegionDataDisplay
