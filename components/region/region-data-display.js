import { Box } from 'theme-ui'
import { Expander } from '@carbonplan/components'
import { X } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'

import Search from '../icons/search'
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
          cursor: 'pointer',
          width: 'fit-content',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover > #icon': { stroke: 'secondary' },
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
        {showRegionPicker ? (
          <X
            id='icon'
            sx={{
              transition: 'stroke 0.15s',
              strokeWidth: '2',
              width: 18,
              height: 18,
              mt: '2px',
              ml: [3],
            }}
          />
        ) : (
          <Search
            id='icon'
            sx={{
              transition: 'stroke 0.15s',
              strokeWidth: '2',
              width: 18,
              height: 18,
              mt: '2px',
              ml: [3],
            }}
          />
        )}
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
