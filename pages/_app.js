import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import '@carbonplan/maps/mapbox.css'
import theme from '@carbonplan/theme'
import { RegionProvider } from '../components/region'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider>
        <RegionProvider>
          <Component {...pageProps} />
        </RegionProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
