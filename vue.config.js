module.exports = {
  devServer: {
    // 配置反向代理
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // 全局引入变量和 mixin
  //       additionalData: `
  //         @import "@/assets/scss/variables.scss";
  //         @import "@/assets/scss/mixin.scss";
  //       `
  //     }
  //   }
  // }
}
