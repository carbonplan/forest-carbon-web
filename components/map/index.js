import { Box, useThemeUI } from 'theme-ui'
import style from './style'
import Enhancers from './enhancers'
import Basemap from './basemap'
import { Canvas, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import { allOptions } from '@constants'

function Map({ options }) {
  const { theme } = useThemeUI()
  const colormap = useColormap('reds')

  const year = allOptions.years.indexOf(options.year)
  return (
    <Box
      sx={{
        flexBasis: '100%',
      }}
    >
      <Canvas style={style} zoom={2} center={[0, 0]} debug={false}>
        <Basemap />
        <Raster
          maxZoom={6}
          ndim={3}
          size={128}
          colormap={colormap}
          clim={[0, 5000]}
          display={true}
          opacity={1}
          mode={'dotgrid'}
          nan={3.4028234663852886e38}
          activeIndex={[year]}
          source={
            'https://carbonplan-scratch.s3.us-west-2.amazonaws.com/junk/v0_emissions_pyramids.zarr/{z}/emissions'
          }
          frag={`
          if (length(gl_PointCoord.xy - 0.5) > 0.5) {
            discard;
          }

          if (value == nan) {
            discard;
          }

          // transform for display
          float rescaled = (value - clim.x)/(clim.y - clim.x);
          vec4 c = texture2D(colormap, vec2(rescaled, 1.0));
          gl_FragColor = vec4(c.x, c.y, c.z, opacity);
          gl_FragColor.rgb *= gl_FragColor.a;
          `}
        />
        <Enhancers />
      </Canvas>
    </Box>
  )
}

export default Map
