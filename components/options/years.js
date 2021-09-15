import { useState } from 'react'
import { Box, Slider, Text } from 'theme-ui'
import { Row, Column, Tag } from '@carbonplan/components'
import Info from '../info'

function Years({ year, setYear, sx }) {
  const [sliderChanging, setSliderChanging] = useState(false)

  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Text sx={sx.heading}>
          Time
          <Info margin={'22px'}>
            Data have been processed for years 2001 through 2018. Drag the
            slider to update the map for the selected year.
          </Info>
        </Text>
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
          min={2001}
          max={2020}
          step={1}
        />
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Text
            sx={{
              fontFamily: 'monospace',
              fontSize: [2],
              display: 'inline-block',
              float: 'left',
            }}
          >
            2001
          </Text>
          <Text
            sx={{
              fontFamily: 'monospace',
              display: 'inline-block',
              ml: 'auto',
              mr: 'auto',
              color: 'secondary',
              opacity: sliderChanging ? 1 : 0,
              transition: '0.2s',
            }}
          >
            {year}
          </Text>
          <Text
            sx={{
              fontFamily: 'monospace',
              float: 'right',
              display: 'inline-block',
              mr: ['4px'],
            }}
          >
            2020
          </Text>
        </Box>
      </Column>
    </Row>
  )
}

export default Years
