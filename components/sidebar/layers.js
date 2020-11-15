import { useState, useCallback } from 'react'
import { Box, Slider, Badge, Text } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Info from '../info'

function Layers({ options, setOptions, children }) {
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
          Emissions
          <Info>
            Explanation of forest-based emissions.
          </Info>
        </Text>
        <Option value='forests' color='red' />
      </Box>
      <Box sx={sx.group}>
        <Text sx={sx.label}>
          Time
          <Info margin={'22px'}>
            We analyze data from 2001 to 2018.
          </Info>
        </Text>
        <Slider
          sx={{ mt: [3], mb: [3] }}
          value={parseFloat(options['year'])}
          onChange={(e) => setSlider('year', e.target.value)}
          min={2001}
          max={2018}
          step={1}
        />
        <Text
          sx={{
            fontFamily: 'monospace',
            fontSize: [2],
            display: 'inline-block',
          }}
        >
          2001
        </Text>
        <Text
          sx={{
            fontFamily: 'monospace',
            float: 'right',
            display: 'inline-block',
          }}
        >
          2018
        </Text>
      </Box>
      {children}
    </Box>
  )
}

export default Layers
