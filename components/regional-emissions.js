import { useMemo } from 'react'
import { Row, Column } from '@carbonplan/components'
import { Chart, Grid, Plot, Line, TickLabels, Circle } from '@carbonplan/charts'
import { Box, Flex } from 'theme-ui'

import { useRegion } from '@carbonplan/maps'
import { RecenterButton, useRegionContext } from './region'

const degToRad = (degrees) => {
  var pi = Math.PI
  return degrees * (pi / 180)
}

const areaOfPixel = (pixelSize, centerLat) => {
  const a = 6378137 // meters
  const b = 6356752.3142 // meters
  const e = Math.sqrt(1 - Math.pow(b / a, 2))
  const delta = [centerLat + pixelSize / 2, centerLat - pixelSize / 2]
  const areaList = delta.map((f) => {
    const zm = 1 - e * Math.sin(degToRad(f))
    const zp = 1 + e * Math.sin(degToRad(f))
    return (
      Math.PI *
      Math.pow(b, 2) *
      (Math.log(zp / zm) / (2 * e) + Math.sin(degToRad(f)) / (zp * zm))
    )
  })
  return ((pixelSize / 360) * (areaList[0] - areaList[1])) / (1000 * 1000) // to km2
}

export const RegionalEmissions = ({ year, color = 'red' }) => {
  const { regionData } = useRegionContext()
  const { region } = useRegion()
  const data = regionData?.value

  const radius = region?.properties?.radius || 0
  const center = region?.properties?.center || 0
  // regional area in km2
  const regionArea = Math.PI * radius * radius
  const areaCorrection = areaOfPixel(1 / 40, center.lat)
  console.log(areaCorrection)

  const chartData = useMemo(() => {
    let lineData = []

    if (!data) return []

    data.coordinates.year.forEach((year) => {
      const yearData = data.emissions[year]
      const average = yearData.reduce((a, d) => a + d, 0) / yearData.length
      lineData.push([year, (average / areaCorrection) * regionArea])
    })

    return lineData
  }, [data, regionArea])

  if (!regionData || regionData.loading) {
    return 'loading...'
  }
  const rangeData = chartData.map((d) => d[1])
  const min = Math.min(...rangeData)
  const max = Math.max(...rangeData)
  const range = [min * 0.75, max]

  const yearData = chartData.find((d) => d[0] === Number(year))
  const validYearData = yearData && !Number.isNaN(yearData[1])

  return (
    <>
      <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <Box
            sx={{
              color: 'red',
              fontFamily: 'monospace',
              letterSpacing: 'monospace',
              fontSize: [4],
              display: 'inline-block',
              ml: [0],
            }}
          >
            {validYearData ? (yearData[1] / 1000000).toFixed(2) + 'M' : 'n/a'}
          </Box>{' '}
          <Box
            sx={{
              fontFamily: 'faux',
              display: 'inline-block',
              letterSpacing: 'faux',
              color: 'secondary',
              fontSize: [1],
              display: 'inline-block',
              ml: [2],
            }}
          >
            tCO₂
          </Box>
        </Box>
        <Box
          as='span'
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'faux',
            color: 'secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontSize: [0],
          }}
        >
          <Box>Recenter map</Box>
          <RecenterButton color='secondary' />
        </Box>
      </Flex>
      <Row columns={3}>
        <Column start={1} width={3}>
          {chartData.length > 0 && (
            <Box sx={{ width: '100%', height: '200px' }}>
              <Chart x={[2001, 2020]} y={range} padding={{ top: 50, left: 0 }}>
                <Grid values={[range[0]]} horizontal />
                <TickLabels values={[2001, 2020]} bottom />

                <Plot>
                  {validYearData && (
                    <Circle
                      x={yearData[0]}
                      y={yearData[1]}
                      color={color}
                      size={15}
                    />
                  )}
                  <Line data={chartData} width={2} color={color} />
                </Plot>
              </Chart>
            </Box>
          )}
        </Column>
      </Row>
    </>
  )
}
export default RegionalEmissions
