import { useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import Sidebar from './sidebar'
import Map from './map'
import Visualization from './visualization'
import Methods from './methods'
import { filterTypes } from '@constants'

function Viewer() {
  const initialOptions = {
    forests: true,
    year: '2001',
    displayYear: '2001',
  }

  const [map, setMap] = useState(null)
  const [region, setRegion] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [options, setOptions] = useState(initialOptions)
  const [selectedData, setSelectedData] = useState(null)
  const [showMethods, setShowMethods] = useState(false)

  useEffect(() => {
    if (!map) return
    // todo: actually grab region data once available
    const data = null
    setSelectedData(data)
  }, [map, region, bounds])

  useEffect(() => {
    if (!map || !region || region.properties.type === filterTypes.VIEWPORT)
      return

    const onMoveEnd = () => setBounds(map.getBounds())
    map.on('moveend', onMoveEnd)
    return function cleanup() {
      map.off('moveend', onMoveEnd)
    }
  }, [map, region])

  const toggleMethods = () => setShowMethods(!showMethods)

  return (
    <Flex
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: ['column', 'row', 'row'],
        overflow: 'hidden',
      }}
    >
      <Sidebar
        options={options}
        setOptions={setOptions}
        showMethods={showMethods}
        toggleMethods={toggleMethods}
      >
        <Visualization data={selectedData} options={options} map={map} />
      </Sidebar>
      <Methods showMethods={showMethods} toggleMethods={toggleMethods} />
      <Map options={options} onChangeRegion={setRegion} onMapReady={setMap} />
    </Flex>
  )
}

export default Viewer
