// 公用配置文件
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: utils.resolvePath('../src/main.js'), //入口主文件
    output: {
        path: utils.resolvePath('../dist'), //出口路径
        filename: utils.staticPath('js/') + 't[name].[hash:4].js', //出口主文件
        publicPath:'./',
    },
    externals: {
        "BMap": "BMap"
    },
    module: {
        rules: [{ //es6或更高阶的js语法转换
                test: /\.jsx?$/,
                use: [
                 {
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/
            },
            { //vue文件处理
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { //图片处理
                test: /\.(jpe?g|png|gif|bmp|jfif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10, //单位: b
                        name: utils.staticPath('images/') + '[name]-[hash:4].[ext]'
                    }

                }]
            },
            { //文字处理
                test: /\.(woff2?|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: utils.staticPath('fonts/') + '[name]-[hash:4].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: utils.resolvePath('../index.html'), //html模板
            filename: 'index.html', //生成html文件名
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'], //文件引入免后缀
        alias: {
            '@': utils.resolvePath('../src') //src快捷路径配置
        }
    },

}