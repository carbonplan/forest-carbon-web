const path = require('path')

//// MODULE ALIASES ////

const resolve = (p) => path.resolve(__dirname, p)

const aliases = {
  '@components': resolve('./components'),
  '@constants': resolve('./constants'),
  '@utils': resolve('./utils'),
}

//// BUNDLE ANALYZER ////

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

//// MDX ////

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

//// EXPORT ////

module.exports = withMDX(
  withBundleAnalyzer({
    pageExtensions: ['jsx', 'js', 'md', 'mdx'],
    webpack: (config, options) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...aliases,
      }

      config.resolve.alias['react'] = path.resolve(
        __dirname,
        '.',
        'node_modules',
        'react'
      )
      config.resolve.alias['theme-ui'] = path.resolve(
        __dirname,
        '.',
        'node_modules',
        'theme-ui'
      )

      return config
    },
  })
)
