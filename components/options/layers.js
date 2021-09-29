import { Text, useColorMode } from 'theme-ui'
import { Filter, Row, Column } from '@carbonplan/components'
import Info from '../info'

function Layers({ layers, setLayers, sx }) {
  const [mode] = useColorMode()
  const emissionsColor = mode === 'light' ? 'red' : 'orange'

  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Text sx={sx.heading}>
          Layers
          <Info>
            Annual estimates of committed emissions based on biomass loss.
            Forests lose biomass via a variety of processes (e.g. deforestation,
            harvest, fire) each of which produces CO₂ at different timescales.
            Regardless, the biomass losses are "committed" to becoming emissions
            eventually.
          </Info>
        </Text>
        <Filter
          values={layers}
          setValues={setLayers}
          colors={{
            emissions_from_clearing: emissionsColor,
            emissions_from_fire: emissionsColor,
            sinks: emissionsColor,
          }}
          sx={{ mt: [2] }}
          multiSelect={true}
        />
      </Column>
    </Row>
  )
}

export default Layers
