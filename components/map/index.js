import { Box, useThemeUI } from 'theme-ui'
import style from './style'
import Enhancers from './enhancers'
import Basemap from './basemap'
import { Canvas, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import { allOptions } from '@constants'

const toShaderVariable = (v) => `_${v}`

function Map({ options }) {
  const { theme } = useThemeUI()
  const colormap = useColormap('reds')

  const renderedOptions = allOptions.years.slice(0, 15)
  const shaderVariables = renderedOptions.map(toShaderVariable)

  const uniforms = renderedOptions.reduce((accum, v) => {
    accum[`${toShaderVariable(v)}Layer`] = options.year === v ? 1 : 0
    return accum
  }, {})

  const valueDefinition = `
  float value;
  ${shaderVariables
    .map(
      (v) => `
  if (${v}Layer == 1.0) {
    value = ${v};
  }
  `
    )
    .join('')}
  `

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
          clim={[0, 100]}
          display={true}
          opacity={1}
          mode={'dotgrid'}
          nan={-3.4e38}
          variables={shaderVariables}
          uniforms={uniforms}
          source={
            'https://carbonplan-scratch.s3.us-west-2.amazonaws.com/junk/v0_emissions_pyramids.zarr/{z}/emissions'
          }
          frag={`
          ${valueDefinition}
          if (length(gl_PointCoord.xy - 0.5) > 0.5) {
            discard;
          }

          if (value == 0.0) {
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
