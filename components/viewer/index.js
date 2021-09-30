import { useThemeUI } from 'theme-ui'
import { Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

import Enhancers from './enhancers'
import { useRegionContext } from '../region'

const COLORMAPS = {
  biomass: { name: 'earth', reversed: false },
  'emissions-v1': { name: 'fire', reversed: false },
  'emissions-v0': { name: 'fire', reversed: false },
  'sinks-v1': { name: 'water', reversed: true },
  'net-v1': { name: 'pinkgreen', reversed: false },
}

const fallback = 'emissions-v1'

const CLIMS = {
  biomass: [0, 1000],
  'emissions-v1': [0, 5000],
  'sinks-v1': [-5000, 0],
  'net-v1': [-30000, 30000],
  'emissions-v0': [0, 5000],
}
function Viewer({ children, year, layer }) {
  const { theme } = useThemeUI()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const { name, reversed } = COLORMAPS[layer] || COLORMAPS[fallback]

  const colormap = useColormap(name)
  if (reversed) {
    colormap.reverse()
  }

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
        clim={CLIMS[layer] || CLIMS[fallback]}
        display={!!layer}
        opacity={1}
        mode={'dotgrid'}
        fillValue={9.969209968386869e36}
        source={
          'https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v1.2/map/forest_carbon_web_data_v1.pyr'
        }
        variable={'variable'}
        setRegionData={setRegionData}
        selector={{
          year: Math.max(parseInt(year), 2015),
          band: layer || fallback,
        }}
      />
      <Enhancers />
      {children}
    </Map>
  )
}

export default Viewer
