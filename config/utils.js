// 公用方法文件
const path = require('path')

module.exports = {
    resolvePath: (dir = './') => {
        return path.resolve(__dirname, dir)
    },
    staticPath: (dir = './') => {
        return path.posix.join('static', dir)
    }
}