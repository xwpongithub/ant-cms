module.exports = {
  chainWebpack(config) {
    let i18nCjsPath = 'vue-i18n/dist/vue-i18n.cjs.js'
    if (process.env.NODE_ENV === 'production') {
      i18nCjsPath = './dist/vue-i18n.cjs.prod.js'
    }
    config.resolve.alias.set('vue-i18n', i18nCjsPath)
  },
  devServer: {
    // 配置反向代理
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixin.scss";
        `
      }
    }
  }
}
