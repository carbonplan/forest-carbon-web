/** @jsx jsx */
import { useState } from 'react'
import { jsx, Box, Text, Grid } from 'theme-ui'
import TimeSeries from './time-series'
import Donut from './donut'
import Histogram from './histogram'
import Info from '../info'
import { allOptions, optionKey, optionIndex } from '@constants'
import * as d3 from 'd3'

export default function Visualization({ data, options, map }) {
  const [mode, setMode] = useState(0)

  if (!data) return null

  const { region, points } = data

  const years = allOptions.years

  const zoomRounded = Math.floor(map.getZoom())

  const scale = {
    9: 1,
    8: 1,
    7: 1,
    6: 1,
    5: 1,
    4: 2.5,
    3: 6.25,
    2: 15.65,
  }

  let totals = []

  years.forEach((year, index) => {
    const subset = points['forests'].filter((d) => {
      return d.properties.y == parseInt(year)
    })
    let total
    if (subset.length > 0) {
      total =
        (subset.reduce((a, b) => a + b.properties.e, 0) * scale[zoomRounded]) /
        1000000
    } else {
      total = 0
    }
    totals[index] = {
      x: year,
      y: total,
    }
  })

  const min = totals.reduce((a, b) => Math.min(a, b.y), totals[0].y)
  const max = totals.reduce((a, b) => Math.max(a, b.y), totals[0].y)
  const total = totals.find((d) => d.x == options.displayYear).y

  const sx = {
    group: {
      p: [3],
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderColor: 'muted',
    },
    label: {
      fontFamily: 'heading',
      letterSpacing: 'wide',
      textTransform: 'uppercase',
      mb: [2],
      fontSize: [2],
    },
    numberCenter: {
      fontFamily: 'monospace',
      letterSpacing: 'monospace',
      fontSize: [4],
      display: 'inline-block',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '28px',
      width: '100%',
    },
    numberLeft: {
      fontFamily: 'monospace',
      letterSpacing: 'monospace',
      fontSize: [4],
      display: 'inline-block',
      ml: [0],
    },
    numberRight: {
      display: 'inline-block',
      float: 'right',
      fontFamily: 'monospace',
      letterSpacing: 'monospace',
      fontSize: [4],
      display: 'inline-block',
      marginTop: '-2px',
      ml: [3],
    },
    metric: {
      fontFamily: 'faux',
      display: 'inline-block',
      letterSpacing: 'faux',
      color: 'text',
      fontSize: [2],
      display: 'inline-block',
      ml: [2],
    },
    unit: {
      fontFamily: 'faux',
      display: 'inline-block',
      letterSpacing: 'faux',
      color: 'secondary',
      fontSize: [1],
      display: 'inline-block',
      ml: [2],
    },
    explanation: {
      fontFamily: 'body',
      fontSize: [1],
      mt: [2],
      mb: [3],
    },
  }

  return (
    <Box>
      <Box sx={sx.group}>
        <Text sx={sx.label}>
          Emissions
          <Info margin={'14px'}>Explain emissions</Info>
        </Text>
        <Text sx={{ ...sx.numberLeft, color: 'red' }}>{total.toFixed(2)}</Text>
        <Text sx={{ ...sx.unit, mb: [3] }}>MtCO₂</Text>
        <TimeSeries
          data={totals}
          domain={[2001, 2018]}
          range={[min, max]}
          selected={{ x: options.displayYear, y: total }}
          color='red'
        />
      </Box>
    </Box>
  )
}
