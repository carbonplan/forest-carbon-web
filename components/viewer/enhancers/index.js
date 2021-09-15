import { Dimmer } from '@carbonplan/components'

import Toolbar from './toolbar'
import { RulerButton } from './ruler'

export default function Enhancers() {
  return (
    <>
      <Toolbar position={'right'}>
        <RulerButton />
        <Dimmer sx={{ color: 'primary' }} />
      </Toolbar>
    </>
  )
}