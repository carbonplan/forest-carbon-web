import { useCallback, useEffect, useState } from 'react'
import { Box, IconButton } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { Right, Left } from '@carbonplan/icons'
import { useRegionContext } from './region'

const ControlPanel = ({ children, title, description }) => {
  const [expanded, setExpanded] = useState(false)
  const { showRegionPicker, setShowRegionPicker } = useRegionContext()

  const handleToggleExpanded = useCallback(() => {
    // Always allow opening of panel
    if (!expanded) {
      setExpanded(true)
    } else {
      // Otherwise, when expanded=true...
      if (showRegionPicker) {
        // also hide region picker when active...
        setShowRegionPicker(false)
      }
      // close panel
      setExpanded(false)
    }
  }, [expanded, showRegionPicker])

  useEffect(() => {
    // Automatically expand panel when region picker is activated
    if (!expanded && showRegionPicker) {
      setExpanded(true)
    }
  }, [showRegionPicker])

  return (
    <>
      <IconButton
        aria-label='Toggle dark mode'
        onClick={handleToggleExpanded}
        role='checkbox'
        sx={{
          width: 32,
          height: 32,
          display: 'inline-block',
          cursor: 'pointer',
          color: 'primary',
          position: 'absolute',
          opacity: expanded ? 1 : 0,
          left: '400px',
          bottom: '14px',
          zIndex: 1001,
        }}
      >
        <Left sx={{}} />
      </IconButton>
      <IconButton
        aria-label='Toggle dark mode'
        onClick={handleToggleExpanded}
        role='checkbox'
        sx={{
          width: 32,
          height: 32,
          display: 'inline-block',
          cursor: 'pointer',
          color: 'primary',
          position: 'absolute',
          opacity: expanded ? 0 : 1,
          left: '14px',
          bottom: '14px',
          zIndex: 1001,
        }}
      >
        <Right />
      </IconButton>
      <Row>
        <Column width={3} start={1}>
          <Box
            sx={{
              position: 'absolute',
              left: '0px',
              right: [
                'calc(3 * 100vw / 6 - 12px)',
                'calc(5 * 100vw / 8 - 18px)',
                'calc(9 * 100vw / 12 - 24px)',
                'calc(9 * 100vw / 12 - 36px)',
              ],
              zIndex: 1000,
              transition: 'transform 0.2s',
              transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <Box
              sx={{
                px: [4, 5, 5, 6],
                height: '56px',
                bg: 'background',
                borderRight: ({ colors }) =>
                  `${expanded ? 1 : 0}px solid ${colors.muted}`,
                borderBottom: ({ colors }) =>
                  `${expanded ? 1 : 0}px solid ${colors.muted}`,
                transition: 'border 0.2s',
              }}
            />
            <Box
              sx={{
                px: [4, 5, 5, 6],
                pb: [4],
                pt: [4],
                pointerEvents: 'all',
                bg: 'background',
                overflowY: 'scroll',
                maxHeight: 'calc(100vh - 56px)',
                minHeight: 'calc(100vh - 56px)',
                transition: 'border 0.2s',
                borderRight: ({ colors }) =>
                  `${expanded ? 1 : 0}px solid ${colors.muted}`,
              }}
            >
              <Box
                sx={{
                  transition: 'opacity 0.2s',
                  opacity: expanded ? 1 : 0,
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Column>
        <Column start={[3, 5, 7, 7]} width={[4, 4, 5, 5]}>
          <Box
            sx={{
              mt: [9],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [6, 7, 7, 8],
              letterSpacing: 'heading',
              fontFamily: 'heading',
              lineHeight: 'heading',
              pointerEvents: expanded ? 'none' : 'all',
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              mt: [3],
              opacity: expanded ? 0 : 1,
              transition: 'opacity 0.3s',
              position: 'relative',
              display: 'block',
              zIndex: 1001,
              fontSize: [3, 3, 3, 4],
              pointerEvents: expanded ? 'none' : 'all',
            }}
          >
            {description}
          </Box>
        </Column>
      </Row>
    </>
  )
}

export default ControlPanel
