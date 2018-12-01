const path = require('path');

module.exports = {
  baseUrl: '/demo/vue-momoplayer-demo/',

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
