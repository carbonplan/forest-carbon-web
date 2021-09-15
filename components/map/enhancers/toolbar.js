import { Box } from 'theme-ui'

export default function Toolbar({ children, position }) {
  const styles = (() => {
    switch (position) {
      case 'left':
        return {
          guide: {
            left: 0,
            bottom: `0px`,
          },
          button: {
            marginTop: '2px',
            marginBottom: '2px',
          },
        }
      case 'right':
        return {
          guide: {
            right: `0px`,
            bottom: 0,
          },
          button: {
            marginLeft: '2px',
            marginRight: '2px',
          },
        }
    }
  })()

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 2,
        ...styles.guide,
      }}
    >
      <Box
        sx={{
          cursor: 'default',
          padding: '12px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            flexDirection: 'row',
            '& > button': {
              ...styles.button,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
