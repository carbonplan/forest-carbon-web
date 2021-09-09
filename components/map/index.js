import { Box, useThemeUI } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import style from './style'
import Enhancers from './enhancers'
import Basemap from './basemap'
import { Canvas, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

mapboxgl.accessToken = ''

function Map() {
  const { theme } = useThemeUI()
  const colormap = useColormap('reds')

  return (
    <Box
      sx={{
        flexBasis: '100%',
      }}
    >
      <Canvas style={style} zoom={2} center={[0, 0]} debug={false}>
        <Basemap />
        <Raster
          minZoom={5}
          maxZoom={5}
          size={128}
          colormap={colormap}
          clim={[0, 100]}
          display={true}
          opacity={1}
          mode={'dotgrid'}
          nan={-3.4e38}
          source={
            // 'https://carbonplan-scratch.s3.us-west-2.amazonaws.com/junk/v0_emissions_pyramids.zarr/{z}/emissions'
            'https://carbonplan.blob.core.windows.net/carbonplan-scratch/zarr-mapbox-webgl/128/{z}'
          }
        />
        <Enhancers />
      </Canvas>
    </Box>
  )
}

export default Map
