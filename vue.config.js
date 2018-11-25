const path = require('path');

module.exports = {
  baseUrl: './',

  chainWebpack: config => {
    config.externals({
      'youtube': 'YT'
    });
  },

  css: {
    loaderOptions: {
      sass: {
        includePaths: [
          path.resolve(__dirname, './node_modules/compass-mixins/lib'),
          path.resolve(__dirname, './src/assets/scss/')
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, "./src/assets/scss/global.scss")]
    }
  }
};
