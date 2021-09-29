const isDev =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
  process.env.NODE_ENV === 'development'

console.log('isDev', isDev)
console.log('env', process.env.VERCEL_ENV)
console.log('public env', process.env.NEXT_PUBLIC_VERCEL_ENV)
const path = require('path')

//// MODULE ALIASES ////

const resolve = (p) => path.resolve(__dirname, p)

const aliases = {
  '@components': resolve('./components'),
  '@constants': resolve('./constants'),
  '@utils': resolve('./utils'),
}

//// MDX ////

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

//// EXPORT ////

module.exports = withMDX({
  pageExtensions: ['jsx', 'js', 'md', 'mdx'],
  assetPrefix: isDev ? '' : 'https://forest-carbon.carbonplan.org',
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
