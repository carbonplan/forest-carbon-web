import { useMemo } from 'react'
import { Box, Flex } from 'theme-ui'
import { useRegion } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { useLayerColors } from './use-layer-colors'
import TimeSeries from './time-series'

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

const areaOfPixelProjected = (lat, zoom) => {
  const c = 40075016.686 / 1000
  return Math.pow(
    (c * Math.cos(degToRad(lat))) / Math.pow(2, Math.floor(zoom) + 7),
    2
  )
}

export const RegionalData = ({ layer, year }) => {
  const { regionData } = useRegionContext()
  const { region } = useRegion()
  const { colors } = useLayerColors()
  const data = regionData?.value
  const zoom = region?.properties?.zoom || 0

  const chartData = useMemo(() => {
    if (!data) return {}

    const lineData = data.coordinates.band.reduce((accum, band) => {
      accum[band] = []
      return accum
    }, {})

    data.coordinates.year.forEach((year) => {
      data.coordinates.band.forEach((band) => {
        const yearData = data.variable[band][year].filter(
          (v) => v !== 9.969209968386869e36
        )
        const average = yearData.reduce((accum, value, idx) => {
          const lat = data.coordinates.lat[idx]
          const area = areaOfPixel(1 / 40, lat) // area of 3km pixel at lat
          const projectedArea = areaOfPixelProjected(lat, zoom) // area of web mercator pixel at lat,zoom
          return accum + (value / area) * projectedArea
        }, 0)

        if (yearData.length > 0) {
          lineData[band].push([year, average])
        }
      })
    })

    return lineData
  }, [layer, data])

  if (!regionData || regionData.loading) {
    return (
      <Box
        sx={{
          pt: [3],
          color: 'secondary',
          fontFamily: 'faux',
          letterSpacing: 'faux',
          fontSize: [2, 2, 2, 3],
        }}
      >
        loading...
      </Box>
    )
  }
  const rangeData = chartData[layer].map((d) => d[1])
  const min = Math.min(...rangeData)
  const max = Math.max(...rangeData)
  const range = [min * 0.75, max]

  const yearData = chartData[layer].find((d) => d[0] === Number(year))
  const validYearData = yearData && !Number.isNaN(yearData[1])

  const { biomass, ...emissionsData } = chartData

  return (
    <>
      <Box
        sx={{
          pt: [3],
          color: colors[layer],
          fontFamily: 'faux',
          letterSpacing: 'faux',
          fontSize: [2, 2, 2, 3],
        }}
      >
        {layer === 'biomass' ? ' ' : layer}
      </Box>
      <TimeSeries data={emissionsData} highlight={layer} year={year} />
      <Box
        sx={{
          pt: [3],
          color: colors.biomass,
          fontFamily: 'faux',
          letterSpacing: 'faux',
          fontSize: [2, 2, 2, 3],
        }}
      >
        biomass
      </Box>
      <TimeSeries data={{ biomass }} highlight='biomass' year={year} />
    </>
  )
}
export default RegionalData
