import React from 'react'
import { Box } from 'theme-ui'

const Search = ({ closed, ...props }) => {
  const style = { vectorEffect: 'non-scaling-stroke' }
  return (
    <Box
      as='svg'
      viewBox='0 0 24 24'
      fill='none'
      width='24'
      height='24'
      stroke='currentColor'
      stroke-width='1.5'
      {...props}
    >
      <line x1='0.7' y1='23.3' x2='8.6' y2='15.4' style={style} />
      <circle cx='14' cy='9.9' r='7.3' style={style} />
    </Box>
  )
}

export default Search
