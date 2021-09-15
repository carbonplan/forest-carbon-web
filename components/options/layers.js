import { Text } from 'theme-ui'
import { Filter, Row, Column } from '@carbonplan/components'
import Info from '../info'

function Layers({ layers, setLayers, sx }) {
  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Text sx={sx.heading}>
          Layers
          <Info>
            Annual estimates of committed emissions based on biomass loss.
            Emissions reflect an unknown combination of several drivers,
            including fires, insects, drought, harvest, and conversion. Based on
            data from Baccini et al. (2012) and Hansen et al. (2013).
          </Info>
        </Text>
        <Filter
          values={layers}
          setValues={setLayers}
          colors={{ emissions: 'orange' }}
          sx={{ mt: [2] }}
        />
      </Column>
    </Row>
  )
}

export default Layers
