import { createContext, useContext, useEffect, useState } from 'react'
import { useBreakpointIndex } from '@theme-ui/match-media'

const RegionContext = createContext(null)

export const RegionProvider = ({ children }) => {
  const [regionData, setRegionData] = useState(null)
  const [showRegionPicker, setShowRegionPicker] = useState(false)
  const index = useBreakpointIndex()

  useEffect(() => {
    // Always hide region picker at mobile
    if (index === 0) {
      setShowRegionPicker(false)
    }
  }, [index])

  return (
    <RegionContext.Provider
      value={{
        regionData,
        setRegionData,
        showRegionPicker,
        setShowRegionPicker,
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export const useRegionContext = () => {
  const { regionData, setRegionData, showRegionPicker, setShowRegionPicker } =
    useContext(RegionContext)

  return {
    regionData,
    setRegionData,
    showRegionPicker,
    setShowRegionPicker,
  }
}
