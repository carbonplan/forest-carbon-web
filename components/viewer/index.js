import { Box, useThemeUI } from 'theme-ui'
import style from './style'
import Enhancers from './enhancers'
import Basemap from './basemap'
import { Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import { allOptions } from '@constants'
import { useRegionContext } from '../region'

function Viewer({ children, year }) {
  const { theme } = useThemeUI()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const colormap = useColormap('fire')

  const yearIdx = allOptions.years.indexOf(year)
  return (
    <Map style={style} zoom={2} center={[0, 0]} debug={false}>
      <Basemap />
      {showRegionPicker && (
        <RegionPicker
          color={theme.colors.primary}
          backgroundColor={theme.colors.background}
          fontFamily={theme.fonts.monospace}
        />
      )}
      <Raster
        colormap={colormap}
        clim={[0, 5000]}
        display={true}
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
      <Enhancers />
      {children}
    </Map>
  )
}

export default Viewer
