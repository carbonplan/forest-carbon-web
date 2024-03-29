import { useCallback, useEffect, useState } from 'react'
import { Box, IconButton } from 'theme-ui'
import { Row, Column, Tray, useScrollbarClass } from '@carbonplan/components'
import { useBreakpointIndex } from '@theme-ui/match-media'

import ArrowThin from './icons/arrow-thin'
import { useRegionContext } from './region'

const ControlPanel = ({
  children,
  title,
  description,
  expanded,
  setExpanded,
}) => {
  const index = useBreakpointIndex()
  const className = useScrollbarClass()
  const { showRegionPicker, setShowRegionPicker } = useRegionContext()
  const [hasExpanded, setHasExpanded] = useState(expanded)
  const [tooltip, setTooltip] = useState(false)

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

  useEffect(() => {
    if (expanded && !hasExpanded) {
      setHasExpanded(true)
    }
  }, [expanded, hasExpanded])

  const overview = (
    <Column start={[1, 2, 7, 7]} width={[4, 4, 5, 5]}>
      <Box
        sx={{
          mt: [9],
          opacity: expanded ? 0 : 1,
          transition: 'opacity 0.3s',
          position: 'relative',
          display: 'block',
          zIndex: 1001,
          fontSize: [5, 7, 7, 8],
          letterSpacing: 'heading',
          fontFamily: 'heading',
          lineHeight: 'heading',
          pointerEvents: 'none',
          userSelect: 'none',
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
          fontSize: [2, 3, 3, 4],
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {description}
      </Box>
    </Column>
  )

  if (index < 2) {
    return (
      <>
        <Tray
          expanded={expanded}
          sx={{
            pb: [4],
            pt: [5],
            transform: expanded ? 'translateY(0)' : 'translateY(-550px)',
          }}
        >
          {children}
        </Tray>
        {!hasExpanded && <Row>{overview}</Row>}
      </>
    )
  }

  return (
    <>
      <IconButton
        aria-label='Toggle settings'
        onClick={handleToggleExpanded}
        onMouseOver={() => {
          if (!expanded) setTooltip(true)
        }}
        onMouseOut={() => setTooltip(false)}
        role='checkbox'
        sx={{
          width: 32,
          height: 32,
          display: ['none', 'none', 'inline-block', 'inline-block'],
          cursor: 'pointer',
          color: 'primary',
          position: 'absolute',
          opacity: 1,
          transition: 'left 0.2s, transform 0.2s',
          left: expanded
            ? [
                'calc(3 * 100vw / 6 - 12px)',
                'calc(3 * 100vw / 8 - 18px)',
                'calc(3 * 100vw / 12 + 37px)',
                'calc(3 * 100vw / 12 + 54px)',
              ]
            : '12px',
          bottom: '13px',
          transform: expanded ? 'scaleX(-1)' : '',
          zIndex: 1001,
        }}
      >
        <ArrowThin sx={{ strokeWidth: 2, width: 24, height: 24 }} />
      </IconButton>
      <Box
        id='open-tooltip'
        sx={{
          display: ['none', 'none', 'inline-block', 'inline-block'],
          color: 'primary',
          position: 'absolute',
          opacity: tooltip ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
          pointerEvents: 'none',
          left: '54px',
          bottom: ['18px', '18px', '18px', '14px'],
          zIndex: 1001,
          fontSize: [3, 3, 3, 4],
        }}
      >
        Show controls
      </Box>
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
              className={className}
              sx={{
                px: [4, 5, 5, 6],
                pb: [4],
                pt: [4],
                pointerEvents: 'all',
                bg: 'background',
                overflowY: 'scroll',
                overflowX: 'hidden',
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
          {overview}
        </Column>
      </Row>
    </>
  )
}

export default ControlPanel
