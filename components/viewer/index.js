import { useThemeUI } from 'theme-ui'
import { Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

import Enhancers from './enhancers'
import { useRegionContext } from '../region'

function Viewer({ children, year, layers }) {
  const { theme } = useThemeUI()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const emissions = useColormap('fire')
  const biomass = useColormap('earth')

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
        colormap={emissions}
        clim={[0, 5000]}
        display={layers.emissions}
        opacity={1}
        mode={'dotgrid'}
        fillValue={3.4028234663852886e38}
        source={
          'https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v0.4/map/emissions_pyramid.zarr'
        }
        variable={'emissions'}
        dimensions={['year', 'y', 'x']}
        selector={{ year: parseInt(year) }}
        setRegionData={setRegionData}
      />
      <Raster
        colormap={biomass}
        clim={[0, 350]}
        display={layers.biomass}
        opacity={1}
        mode={'dotgrid'}
        fillValue={9.969209968386869e36}
        source={
          'https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v1.2/map/emissions_pyramid.zarr'
        }
        variable={'biomass_v1'}
        dimensions={['year', 'y', 'x']}
        selector={{ year: Math.max(parseInt(year), 2014) }}
      />
      <Enhancers />
      {children}
    </Map>
  )
}

export default Viewer
