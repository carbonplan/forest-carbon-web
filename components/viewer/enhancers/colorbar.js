import { Box } from 'theme-ui'
import { format } from 'd3-format'

const Colorbar = ({ label, colormap, clim, units }) => {
  const values = colormap.map((d, i) => `rgb(${d}) ${(i / 255) * 100}%`)
  const css = `linear-gradient(to top, ${values.join(',')})`
  return (
    <Box sx={{ position: 'relative', minWidth: '100px' }}>
      <Box
        sx={{
          position: 'absolute',
          writingMode: 'tb-rl',
          transform: 'rotate(180deg) translateY(-50%)',
          fontFamily: 'mono',
          fontSize: ['9px', 0, 0, 1],
          letterSpacing: 'smallcaps',
          textTransform: 'uppercase',
          left: 0,
          bottom: ['56px', '60px', '60px', '80px'],
          height: ['110px', '110px', '110px', '150px'],
        }}
      >
        {label}{' '}
        <Box
          as='span'
          sx={{
            textTransform: 'none',
            color: 'primary',
            display: 'inline-block',
          }}
        >
          {units}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          fontFamily: 'mono',
          fontSize: ['9px', 0, 0, 1],
          letterSpacing: 'smallcaps',
          textTransform: 'uppercase',
          left: ['34px', '50px', '50px', '54px'],
          bottom: '-5px',
        }}
      >
        {format('~s')(clim[0])}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          fontFamily: 'mono',
          fontSize: ['9px', 0, 0, 1],
          letterSpacing: 'smallcaps',
          textTransform: 'uppercase',
          left: ['34px', '50px', '50px', '54px'],
          bottom: ['73px', '100px', '100px', '120px'],
        }}
      >
        {format('~s')(clim[1])}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          height: ['80px', '110px', '110px', '130px'],
          width: ['9px', '17px', '17px', '17px'],
          left: ['18px', '23px', '23px', '27px'],
          bottom: 0,
          border: ({ colors }) => `solid 1px ${colors.hinted}`,
          background: css,
        }}
      />
    </Box>
  )
}

export default Colorbar
