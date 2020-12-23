const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve } = require('./utils')

const { NODE_ENV } = process.env;
const __isDEV = NODE_ENV === 'development';

const dllMap = require(`${resolve('dist/lib/dll-manifest.json')}`);
const pathVal = __isDEV ? '/' : '/learning-tools/';
module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: pathVal,
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      minChunks: 4,
      cacheGroups: {
        vendors: {
          name: 'common',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'all'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },
    concatenateModules: true
  },
  module: {
    noParse: /^(vue|vue-router|vuex)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.[jt]s$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.([jt]s|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('src')],
        options: {
          cache: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      // {
      //   test: /\.(scss|less|css)$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //     'postcss-loader',
      //     'sass-loader',
      //     {
      //       loader: 'sass-resources-loader',
      //       options: {
      //         sourceMap: true,
      //         resources: [
      //           resolve('src/styles/mixins/mixins.scss'),
      //         ]
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash:7].[ext]',
            limit: 4096,
            esModule: false,
          },
        }
      ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'media/[name].[hash:7].[ext]',
          limit: 4096,
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'font/[name].[hash:7].[ext]',
          limit: 4096,
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
      'routes': resolve('src/routes'),
      'modules': resolve('src/modules'),
      'utils': resolve('src/utils'),
    },
    // 加速查找---可不配
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ...require('./env.js')
      }
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*/', '!lib']
      // cleanOnceBeforeBuildPatterns: ['js']
    }),
    // new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      name: 'lib_dll',
      manifest: dllMap
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist')
        }
      ]
    }),
    new HtmlWebpackPlugin(
      {
        template: path.join(__dirname, 'index.html'),
        title: 'demo',
        filename: 'index.html',
        baseUrl: pathVal,
        templateParameters: {
          dll: `${pathVal}lib/${dllMap.name}.js`
        }
      }
    )
  ],
};