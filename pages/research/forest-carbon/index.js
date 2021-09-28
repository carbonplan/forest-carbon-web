import { useState } from 'react'
import { Box, Container, useColorMode } from 'theme-ui'
import { Group, Meta, Guide, Link, Header } from '@carbonplan/components'
import { useBreakpointIndex } from '@theme-ui/match-media'

import ControlPanel from '../../../components/control-panel'
import ControlPanelDivider from '../../../components/control-panel-divider'
import { RegionDataDisplay } from '../../../components/region'

import Layers from '../../../components/options/layers'
import Years from '../../../components/options/years'
import Viewer from '../../../components/viewer'
import RegionalEmissions from '../../../components/regional-emissions'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [1, 1, 1, 2],
  },
  description: {
    fontSize: [1, 1, 1, 2],
    pb: ['2px'],
  },
}

const initialLayers = {
  emissions: true,
  biomass: true,
}

function Index() {
  const [layers, setLayers] = useState(initialLayers)
  const [year, setYear] = useState('2001')
  const [expanded, setExpanded] = useState(false)
  const [colorMode] = useColorMode()
  const index = useBreakpointIndex({ defaultIndex: 2 })
  const isNarrow = index < 2

  return (
    <>
      <Meta
        title={'forest carbon / research / carbonplan'}
        description={
          'Mapping forest carbon for biomass and emissions monitoring.'
        }
        card={'https://images.carbonplan.org/social/forest-carbon.png'}
      />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Box
          as='header'
          sx={
            isNarrow
              ? {
                  width: '100%',
                  borderStyle: 'solid',
                  borderColor: 'muted',
                  borderWidth: '0px',
                  borderBottomWidth: '1px',
                  position: 'sticky',
                  top: 0,
                  bg: 'background',
                  height: '56px',
                  zIndex: 2000,
                }
              : {}
          }
        >
          <Container>
            <Header
              dimmer={'none'}
              settings={{
                expanded,
                onClick: () => setExpanded((prev) => !prev),
              }}
            />
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
        }}
      >
        <Viewer year={year} layers={layers}>
          <Container>
            <ControlPanel
              title='Mapping forest carbon'
              description={
                <span>
                  Read our{' '}
                  <Link
                    sx={{ pointerEvents: expanded ? 'none' : 'all' }}
                    href='/blog/climate-trace-release'
                  >
                    blog post
                  </Link>
                  , explore the{' '}
                  <Link
                    sx={{ pointerEvents: expanded ? 'none' : 'all' }}
                    onClick={() => setExpanded(true)}
                  >
                    map
                  </Link>
                </span>
              }
              expanded={expanded}
              setExpanded={setExpanded}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This map shows annual committed emissions from stand-replacing
                  forest disturbance. It's generated by combining year 2000{' '}
                  <Link href='https://doi.org/10.1111/gcb.13153'>
                    aboveground biomass
                  </Link>{' '}
                  with{' '}
                  <Link href='https://doi.org/10.1126/science.1244693'>
                    forest cover change
                  </Link>
                  . It was prepared for the{' '}
                  <Link href='https://climatetrace.org'>Climate TRACE</Link>{' '}
                  project. Read our{' '}
                  <Link href='/blog/climate-trace-release'>blog post</Link> or
                  check out our{' '}
                  <Link href='https://github.com/carbonplan/trace'>
                    GitHub repository
                  </Link>{' '}
                  for more details.
                </Box>
                <ControlPanelDivider />
                <Layers layers={layers} setLayers={setLayers} sx={sx} />
                <ControlPanelDivider />
                <Years year={year} setYear={setYear} sx={sx} />
                {!isNarrow && <ControlPanelDivider />}
                {!isNarrow && (
                  <RegionDataDisplay sx={sx}>
                    <RegionalEmissions
                      year={year}
                      color={colorMode === 'light' ? 'red' : 'orange'}
                    />
                  </RegionDataDisplay>
                )}
              </Group>
            </ControlPanel>
          </Container>
        </Viewer>
      </Box>
    </>
  )
}

export default Index
