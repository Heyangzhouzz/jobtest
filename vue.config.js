const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_BASE_URL,
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  devServer: {
    port: process.env.PORT || 8328,
    proxy: {
      '/api': {
        target: 'https://mockroll.irs01.com',
        pathRewrite: {
          '^/api': '/mock/99'
        },
        changeOrigin: true,
        ws: true
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].chunksSortMode = 'none'
        return args
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
  // configureWebpack: {
  //   externals: {
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'element-ui': 'ELEMENT',
  //     'axios': 'axios',
  //     'NProgress': 'NProgress',
  //     'echarts': 'echarts',
  //     'vue-echarts': 'VueECharts'
  //   }
  // }
}
