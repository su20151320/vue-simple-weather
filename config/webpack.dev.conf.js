// 开发环境配置

const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base.conf')
const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  devServer: {
    open:true,
    port: 8080,
    https: true,
    contentBase: './dist'
  },
  devtool: 'inline-source-map', //用来追踪到错误和警告在源代码中的原始位置
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader:MiniCssExtractPlugin.loader,
          options:{publicPath:'../../'}// 公用路径调试到外层，直到样式路径正确为止
        },
        // {
        //   loader: 'style-loader'
        // },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options:{
            ident:'postcss',
            sourceMap:true,
            plugins:(loader) =>[
              require('autoprefixer')({
                overrideBrowserslist:['last 2 versions','> 1%']
              })
            ]
          }
        },
      ]
    }]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:utils.staticPath('css/')+'[name].[hash:4].css'
    })
  ]
})