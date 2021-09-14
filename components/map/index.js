import { Box, useThemeUI } from 'theme-ui'
import style from './style'
import Enhancers from './enhancers'
import Basemap from './basemap'
import { Canvas, Raster, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import { allOptions } from '@constants'
import { useRegionContext } from '../region'

function Map({ children, year }) {
  const { theme } = useThemeUI()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const colormap = useColormap('reds')

  const yearIdx = allOptions.years.indexOf(year)
  return (
    <Canvas style={style} zoom={2} center={[0, 0]} debug={false}>
      <Basemap />
      {showRegionPicker && (
        <RegionPicker
          color={theme.colors.primary}
          backgroundColor={theme.colors.background}
          fontFamily={theme.fonts.monospace}
        />
      )}
      <Raster
        setRegionData={setRegionData}
        maxZoom={6}
        ndim={3}
        size={128}
        colormap={colormap}
        clim={[0, 5000]}
        display={true}
        opacity={1}
        mode={'dotgrid'}
        nan={3.4028234663852886e38}
        activeIndex={[yearIdx]}
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
      {children}
    </Canvas>
  )
}

export default Map
