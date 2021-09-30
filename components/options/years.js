import { useState } from 'react'
import { Box } from 'theme-ui'
import { Row, Column, Tag, Slider } from '@carbonplan/components'
import Info from '../info'

function Years({ year, setYear, sx }) {
  const [sliderChanging, setSliderChanging] = useState(false)

  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Box sx={sx.heading}>
          Time
          <Info margin={'22px'}>
            Annual estimates are available for the years 2001 through 2020. Drag
            the slider to update the map for the selected year.
          </Info>
        </Box>
        <Slider
          sx={{ mt: [3], mb: [3] }}
          value={parseFloat(year)}
          onMouseUp={() => {
            setSliderChanging(false)
          }}
          onChange={(e) => setYear(e.target.value)}
          onMouseDown={() => {
            setSliderChanging(true)
          }}
          min={2014}
          max={2020}
          step={1}
        />
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [1],
              display: 'inline-block',
              float: 'left',
            }}
          >
            2014
          </Box>
          <Box
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              display: 'inline-block',
              ml: 'auto',
              mr: 'auto',
              color: 'secondary',
              opacity: sliderChanging ? 1 : 0,
              transition: '0.2s',
              fontSize: [1],
            }}
          >
            {year}
          </Box>
          <Box
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [1],
              float: 'right',
              display: 'inline-block',
            }}
          >
            2020
          </Box>
        </Box>
      </Column>
    </Row>
  )
}

export default Years
