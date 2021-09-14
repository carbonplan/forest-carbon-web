import { useState } from 'react'
import { Box, Container } from 'theme-ui'
import { Group, Meta, Guide, Header } from '@carbonplan/components'

import ControlPanel from '../components/control-panel'
import ControlPanelDivider from '../components/control-panel-divider'
import { RegionDataDisplay } from '../components/region'

import Layers from '../components/options/layers'
import Years from '../components/options/years'
import Map from '../components/map'
import Methods from '../components/methods'
import RegionalEmissions from '../components/regional-emissions'

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
  },
}

const initialLayers = {
  forests: true,
}

function Index() {
  const [layers, setLayers] = useState(initialLayers)
  const [year, setYear] = useState('2001')
  const [showMethods, setShowMethods] = useState(false)

  const toggleMethods = () => setShowMethods(!showMethods)
  const methods = (
    <Methods showMethods={showMethods} toggleMethods={toggleMethods} />
  )

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Container>
          <Header dimmer={'none'} />
        </Container>
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
        <Map year={year}>
          <Container>
            <ControlPanel title='Forest carbon'>
              <Group>
                <Box sx={sx.description}>Some text here.</Box>
                <ControlPanelDivider />
                <Layers layers={layers} setLayers={setLayers} sx={sx} />
                <ControlPanelDivider />
                <Years year={year} setYear={setYear} sx={sx} />
                <ControlPanelDivider />
                <RegionDataDisplay sx={sx}>
                  <RegionalEmissions year={year} />
                </RegionDataDisplay>
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Index
