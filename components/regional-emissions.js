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

export const RegionalEmissions = ({ year, color = 'orange' }) => {
  const { regionData } = useRegionContext()
  const { region } = useRegion()
  const data = regionData?.value

  const regionArea = region?.properties?.area || 0
  const radius = region?.properties?.radius || 0
  const center = region?.properties?.center || 0
  // regional area in km2
  const circleArea = Math.PI * radius * radius
  const areaCorrection = areaOfPixel(1 / 40, center.lat)

  const chartData = useMemo(() => {
    console.log({ polygon: regionArea, circle: circleArea })

    let lineData = []

    if (!data) return []

    data.coordinates.year.forEach((year) => {
      const yearData = data.emissions[year]
      const average =
        yearData.reduce((accum, emissions, idx) => {
          const lat = data.coordinates.lat[idx]
          const area = areaOfPixel(1 / 40, lat)
          return accum + emissions / area
        }, 0) / yearData.length

      const areas = data.coordinates.lat.map((lat) => areaOfPixel(1 / 40, lat))

      // console.log('lats', {
      //   min: Math.min(...data.coordinates.lat),
      //   max: Math.max(...data.coordinates.lat),
      //   center: center.lat,
      // })
      // console.log('areas', {
      //   min: Math.min(...areas),
      //   max: Math.max(...areas),
      //   old: areaCorrection,
      // })
      const oldAverage = yearData.reduce((a, d) => a + d, 0) / yearData.length
      const oldValue = (oldAverage / areaCorrection) * circleArea

      lineData.push([year, average * regionArea])
    })

    return lineData
  }, [data, regionArea])

  if (!regionData || regionData.loading) {
    return <Box sx={{pt: [3], color: 'secondary', fontFamily: 'faux', letterSpacing: 'faux', fontSize: [2, 2, 2, 3]}}>loading...</Box>
  }
  const rangeData = chartData.map((d) => d[1])
  const min = Math.min(...rangeData)
  const max = Math.max(...rangeData)
  const range = [min * 0.75, max]

  const yearData = chartData.find((d) => d[0] === Number(year))
  const validYearData = yearData && !Number.isNaN(yearData[1])

  return (
    <>
      <Flex
        sx={{ pt: [3], flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Box>
          <Box
            sx={{
              color: 'orange',
              fontFamily: 'mono',
              letterSpacing: 'mono',
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
            tCO₂ in {year}
          </Box>
        </Box>
      </Flex>
      <Row columns={3}>
        <Column start={1} width={3}>
          {chartData.length > 0 && (
            <Box sx={{ width: '100%', height: '170px' }}>
              <Chart x={[2001, 2020]} y={range} padding={{ top: 10, left: 0 }}>
                <Grid values={[2005, 2010, 2015, 2020]} vertical />
                <TickLabels values={[2005, 2010, 2015, 2020]} bottom />
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
