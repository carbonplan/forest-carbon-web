import React from 'react'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import '@carbonplan/maps/mapbox.css'
import theme from '@carbonplan/theme'
import { RegionProvider } from '../components/region'

const App = ({ Component, pageProps }) => {
  return (
    <PlausibleProvider domain='carbonplan.org'>
      <ThemeProvider theme={theme}>
        <MDXProvider>
          <RegionProvider>
            <Component {...pageProps} />
          </RegionProvider>
        </MDXProvider>
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App
