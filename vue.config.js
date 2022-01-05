const fs = require('fs-extra')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const package = require('./package')

const cssExtract = (process.env.NODE_BUILD_CSS_EXTRACT || '').trimEnd() === 'false'
const env = (process.env.NODE_BUILD_ENV || '').trimEnd()
fs.mkdirpSync(path.join(__dirname, 'dist'))

const baseUrl = 'http://192.168.4.83:7005'
const spaUrl = 'http://db.kgsolution.cn:10047'

const componentBuildConfig = {
  outputDir: 'dist' + '/components',
  css: {
    extract: cssExtract,
    loaderOptions: {
      scss: {
        prependData: "@import '~@/assets/styles/variables-defined.scss';"
      }
    }
  },
  productionSourceMap: env === 'analysis',
  configureWebpack: config => {
    if (env === 'production' || env === 'dev' || env === 'analysis') {
      config.externals = [{
        lodash: {
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash',
          root: '_'
        },
        jquery: {
          commonjs: 'jquery',
          commonjs2: 'jquery',
          amd: 'jquery',
          root: '$'
        },
        'moment-es6': 'moment',
        moment: 'moment',
        'element-ui': 'ElementUI' // 名字应该不对
      }]
      if (env === 'analysis') {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }
  }
}
const appBuildConfig = {
  outputDir: 'dist',
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/variables-defined.scss";'
      }
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: './',
  indexPath: 'index.html',
  parallel: false,
  devServer: {
    proxy: {
      '/api': {
        target: baseUrl
      },
      '/search': {
        target: baseUrl
      },
      '/spa': {
        target: spaUrl
      }
    }
  }
}

module.exports = env ? componentBuildConfig : appBuildConfig
