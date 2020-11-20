import { useState } from 'react'
import { Box, Slider, Badge, Text } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { debounce } from 'lodash'
import Info from '../info'

function Layers({ options, setOptions, children }) {
  const [sliderChanging, setSliderChanging] = useState(false)

  const sx = {
    group: {
      p: [3],
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      width: '100%',
    },
    groupFinal: {
      p: [3],
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px',
      borderTopWidth: '1px',
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    label: {
      fontFamily: 'heading',
      letterSpacing: 'wide',
      textTransform: 'uppercase',
      mb: [2],
    },
    sublabel: {
      display: 'inline-block',
      color: 'primary',
      fontFamily: 'faux',
      letterSpacing: 'faux',
    },
    arrow: {
      display: 'inline-block',
      color: 'primary',
      fontFamily: 'faux',
      letterSpacing: 'faux',
      mr: [2],
      verticalAlign: 'middle',
    },
  }

  function toggleOption(value) {
    setOptions((options) => {
      return { ...options, [value]: !options[value] }
    })
  }

  function toggleRadio(name, value) {
    setOptions((options) => {
      return { ...options, [name]: value }
    })
  }

  function setSlider(name, value) {
    setOptions((options) => {
      return { ...options, [name]: value }
    })
  }

  const Option = ({ value, color, disabled }) => {
    return (
      <Badge
        variant='primary'
        onClick={() => toggleOption(value)}
        sx={{
          mr: [3],
          color: options[value] & !disabled ? color : alpha(color, 0.2),
          borderColor: options[value] & !disabled ? color : alpha(color, 0.2),
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        {value}
      </Badge>
    )
  }

  const Radio = ({ name, value, color, disabled }) => {
    return (
      <Badge
        variant='primary'
        onClick={() => toggleRadio(name, value)}
        sx={{
          mr: [3],
          color:
            (options[name] == value) & !disabled ? color : alpha(color, 0.2),
          borderColor:
            (options[name] == value) & !disabled ? color : alpha(color, 0.2),
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        {value}
      </Badge>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={sx.group}>
        <Text sx={sx.label}>
          Committed emissions
          <Info>
            Annual estimates of committed emissions based on biomass loss.
            Emissions reflect an unknown combination of several drivers,
            including fires, insects, drought, harvest, and conversion. Based on
            data from Baccini et al. (2012) and Hansen et al. (2013).
          </Info>
        </Text>
        <Option value='forests' color='red' />
      </Box>
      <Box sx={sx.group}>
        <Text sx={sx.label}>
          Time
          <Info margin={'22px'}>
            Data have been processed for years 2001 through 2018. Drag the
            slider to update the map for the selected year.
          </Info>
        </Text>
        <Slider
          sx={{ mt: [3], mb: [3], width: '314px' }}
          value={parseFloat(options['displayYear'])}
          onMouseUp={(e) => {
            setSlider('year', e.target.value)
            setSlider('displayYear', e.target.value)
            setSliderChanging(false)
          }}
          onChange={(e) => setSlider('displayYear', e.target.value)}
          onMouseDown={() => {
            setSliderChanging(true)
          }}
          min={2001}
          max={2018}
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
            {options.displayYear}
          </Text>
          <Text
            sx={{
              fontFamily: 'monospace',
              float: 'right',
              display: 'inline-block',
              mr: ['4px'],
            }}
          >
            2018
          </Text>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default Layers
