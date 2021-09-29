import { useThemeUI } from 'theme-ui'
import { Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

import Enhancers from './enhancers'
import { useRegionContext } from '../region'

const COLORMAPS = {
  emissions_from_clearing: 'fire',
  emissions_from_fire: 'fire',
  sinks: 'fire',
}

const CLIMS = {
  emissions: [0, 5000],
  emissions_from_clearing: [0, 350],
  emissions_from_fire: [0, 350],
  sinks: [0, 350],
}
function Viewer({ children, year, layers }) {
  const { theme } = useThemeUI()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const layer = Object.keys(layers).find((l) => layers[l])
  const colormap = useColormap(
    COLORMAPS[layer] || COLORMAPS.emissions_from_clearing
  )

  return (
    <Map maxZoom={8} minZoom={1} zoom={2} center={[0, 0]} debug={false}>
      <Line
        color={theme.rawColors.primary}
        source={
          'https://storage.googleapis.com/carbonplan-research/articles/offset-project-fire/basemap'
        }
        variable={'ne_10m_land'}
      />

      {showRegionPicker && (
        <RegionPicker
          color={theme.colors.primary}
          backgroundColor={theme.colors.background}
          fontFamily={theme.fonts.mono}
          fontSize={'14px'}
          minRadius={50}
          maxRadius={4000}
        />
      )}
      <Raster
        colormap={colormap}
        clim={CLIMS[layer] || CLIMS.emissions_from_clearing}
        display={true}
        opacity={1}
        mode={'dotgrid'}
        fillValue={9.969209968386869e36}
        source={
          'https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v1.2/map/emissions_v1.pyr'
        }
        variable={'variable'}
        setRegionData={setRegionData}
        selector={{ year: Math.max(parseInt(year), 2015), band: layer }}
      />
      <Enhancers />
      {children}
    </Map>
  )
}

export default Viewer
