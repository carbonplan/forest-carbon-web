import React from 'react'
import { Box } from 'theme-ui'

const Settings = ({ closed, ...props }) => {
  const style = { vectorEffect: 'non-scaling-stroke' }
  return (
    <Box
      as='svg'
      viewBox='0 0 26 26'
      fill='none'
      width='24'
      height='24'
      stroke='currentColor'
      stroke-width='1.5'
      {...props}
    >
      <line x1={8} x2={18} y1={8} y2={18} style={style} />
      <line x1={8} x2={18} y1={18} y2={8} style={style} />
      <circle cx='13' cy='13' r='12' style={style} />
    </Box>
  )
}

export default Settings
