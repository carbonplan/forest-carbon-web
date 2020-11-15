import { useState, useEffect } from 'react'
import { useThemeUI } from 'theme-ui'

function useOptions(map, options) {
  const context = useThemeUI()
  const theme = context.theme

  useEffect(() => {
    const target = parseInt(options.year)
    const filters = ['==', 'y', target]
    map.setFilter('forests', filters)

    const updateLayer = (name) => {
      if (options[name]) {
        map.setPaintProperty('forests', 'circle-opacity', 1)
      } else {
        map.setPaintProperty('forests', 'circle-opacity', 0)
      }
    }

    updateLayer('forests')

  }, [context, options])
}

export default useOptions
