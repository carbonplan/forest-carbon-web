import { Box } from 'theme-ui'
import { Expander } from '@carbonplan/components'
import { X } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'

import Search from '../icons/search'
import Info from '../info'
import { useRegionContext } from './context'

export const RegionDataDisplay = ({ children, sx }) => {
  const { showRegionPicker, setShowRegionPicker, regionData } =
    useRegionContext()

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'inline-block',
            mt: ['-4px'],
            cursor: 'pointer',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover > #icon': { stroke: 'secondary' },
              '&:hover > #label': { color: 'secondary' },
            },
          }}
          onClick={() => setShowRegionPicker(!showRegionPicker)}
        >
          <Box
            id='label'
            sx={{
              ...sx.heading,
              transition: 'color 0.15s',
              display: 'inline-block',
            }}
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
                top: '3px',
                position: 'relative',
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
                top: '3px',
                position: 'relative',
                ml: [3],
              }}
            />
          )}
        </Box>
        <Info>
          Committed emissions occurring within the circled region are summed to
          produce an annual time series.
        </Info>
      </Box>

      <Box
        sx={{ opacity: showRegionPicker ? 1 : 0, transition: 'opacity 0.15s' }}
      >
        {showRegionPicker ? children : <div />}
      </Box>
    </>
  )
}

export default RegionDataDisplay
