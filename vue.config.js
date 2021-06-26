const path = require("path");

module.exports = {
  publicPath: "./",
  // outputDir: 'dist',
  lintOnSave: false,
  // pages: {
  //   index: {
  //     entry: 'src/pages/index/index.js',
  //     template: 'src/pages/index/index.html',
  //     filename: 'index.html'
  //   },
  //   view1: {
  //     entry: 'src/pages/view1/view1.js',
  //     template: 'src/pages/view1/view1.html',
  //     filename: 'view1.html'
  //   },
  //   view2: {
  //     entry: 'src/pages/view2/view2.js',
  //     template: 'src/pages/view2/view2.html',
  //     filename: 'view2.html'
  //   }
  // },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10 * 1024,
        outputPath: "img",
      });
  },
  devServer: {
    proxy: {
      "/toyomall": {
        target: "http://localhost",
        // changeOrigin: true, // 允许websockets跨域
        // ws: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/theme-chalk/index.css": {
        target: "http://unpkg.com/element-plus/lib",
        changeOrigin: true,
      },
    }, // 代理转发配置，用于调试环境
  },
};
