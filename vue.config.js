const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  baseUrl: '/demo/vue-momoplayer-demo/',

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Production Mode');
      config.optimization = {
        minimizer: [
          new UglifyJsPlugin({
            extractComments: false,
            uglifyOptions: {compress: {drop_console: true}}
          })
        ]
      }
    }
    else {
      console.log('Development Mode');
    }
  },

  chainWebpack: config => {
    config.externals({
      'youtube': 'YT'
    });
  },

  css: {
    loaderOptions: {
      sass: {
        includePaths: [
          '/Users/keita/Dropbox/DEVELOP/Mockups/play.matium/Vue-MomoPlayer-Demo/node_modules/compass-mixins/lib',
          '/Users/keita/Dropbox/DEVELOP/Mockups/play.matium/Vue-MomoPlayer-Demo/src/assets/scss'
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, "./src/assets/scss/global.scss")]
    }
  },

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
};
