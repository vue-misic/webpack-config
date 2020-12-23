const path = require('path');
const webpack = require('webpack');
const OUTPUT_PATH = path.resolve('dist/lib');

const { NODE_ENV } = process.env;
const vuefile =  NODE_ENV !== 'production' ? 'vue/dist/vue.esm.js' : 'vue';
module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    dll: [vuefile, 'vue-router', 'vuex', 'js-cookie', 'axios', '@zm-fe/zm-jssdk'],
  },
  output: {
    hashDigestLength: 8,
    filename: '[name]-[hash].js',
    path: OUTPUT_PATH,
    libraryTarget: 'var',
    library: 'lib_[name]'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // 创建dll包和模块的映射关系
    new webpack.DllPlugin({
      name: '[name]-[hash]',
      path: path.resolve(OUTPUT_PATH, '[name]-manifest.json')
    })
  ]
}