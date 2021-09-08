import { useState, useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { colorRanges } from '@constants'
import * as P from 'polished'

function useTheme(map) {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  useEffect(() => {
    map.setPaintProperty('background', 'background-color', colors.background)
    map.setPaintProperty('background', 'background-opacity', 1)
    map.setPaintProperty('land', 'fill-opacity', 0)
    map.setPaintProperty('lakes', 'fill-color', colors.muted)
    map.setPaintProperty('lakes', 'fill-opacity', 0.25)
    map.setPaintProperty('countries', 'line-color', colors.primary)
    map.setPaintProperty('countries', 'line-opacity', 0.4)
    map.setPaintProperty('states', 'line-color', colors.primary)
    map.setPaintProperty('states', 'line-opacity', 0.4)
    map.setPaintProperty('roads', 'line-color', colors.primary)
    map.setPaintProperty('roads', 'line-opacity', 0.1)
    map.setPaintProperty('forests', 'circle-color', {
      property: 'e',
      stops: [
        [colorRanges['forests'][0], P.rgba(colors['red'], 0)],
        [colorRanges['forests'][1], colors['red']],
      ],
    })
  }, [colors])
}

export default useTheme
