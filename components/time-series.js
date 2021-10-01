import { Row, Column } from '@carbonplan/components'
import {
  Chart,
  Grid,
  Plot,
  Line,
  TickLabels,
  Ticks,
  Circle,
} from '@carbonplan/charts'
import { Box, Flex } from 'theme-ui'
import { useLayerColors } from './use-layer-colors'

export const TimeSeries = ({
  data,
  highlight,
  year,
  minRangeFactor = 1,
  showZeroes = false,
  tickDecimals = 0,
}) => {
  const { colors } = useLayerColors()
  const color = colors[highlight]

  const bandsToRender = Object.keys(data).filter(
    (band) => data[band].length > 0
  )

  const rangeData = bandsToRender
    .map((band) => data[band].map((d) => d[1]))
    .flat()

  const min = Math.min(...rangeData)
  const max = Math.max(...rangeData)
  const range = [min * minRangeFactor, max]
  const ticks = [range[0], range[1]]
  if (showZeroes) {
    ticks.push(0)
    ticks.sort()
  }
  const tickLabels = ticks.map(
    (tick) => (tick / 1000000).toFixed(tickDecimals) + 'M'
  )

  const yearData = data[highlight]?.find((d) => d[0] === Number(year))
  const validYearData = yearData && !Number.isNaN(yearData[1])

  return (
    <>
      <Flex
        sx={{
          pt: ['12px'],
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {data[highlight] && (
          <Box>
            <Box
              sx={{
                color: color,
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
        )}
      </Flex>
      <Row columns={3}>
        <Column start={1} width={3}>
          {bandsToRender.length > 0 && (
            <Box sx={{ width: '100%', height: '170px' }}>
              <Chart
                x={[2014, 2020]}
                y={range}
                padding={{ top: 10, left: 7, right: 7 }}
              >
                <Grid values={[2014, 2016, 2018, 2020]} vertical />
                <TickLabels values={[2014, 2016, 2018, 2020]} bottom />
                <Grid values={range} horizontal />
                <Ticks values={ticks} left />
                <TickLabels values={ticks} labels={tickLabels} left />
                <Plot>
                  {validYearData && (
                    <Circle
                      x={yearData[0]}
                      y={yearData[1]}
                      color={color}
                      size={18}
                    />
                  )}
                  {bandsToRender.map((band) => (
                    <Line
                      key={band}
                      data={data[band]}
                      width={2}
                      color={colors[band]}
                    />
                  ))}
                  {showZeroes && (
                    <Line
                      data={[
                        [2014, 0],
                        [2020, 0],
                      ]}
                      width={2}
                      sx={{ 'stroke-dasharray': 10 }}
                      color={'gray'}
                    />
                  )}
                </Plot>
              </Chart>
            </Box>
          )}
        </Column>
      </Row>
    </>
  )
}
export default TimeSeries
