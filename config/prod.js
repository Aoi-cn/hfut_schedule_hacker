/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {
    prerender: {
      match: 'pages/schedule/**', // 所有以 `pages/shop/` 开头的页面都参与 prerender
      include: ['pages/event/index', 'pages/home/index'], // `pages/any/way/index` 也会参与 prerender
      console: true,
      // exclude: ['pages/shop/index/index'] // `pages/shop/index/index` 不用参与 prerender
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
