
const { resolve } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                resolve('src/styles/mixins/mixins.scss'),
              ]
            }
          }
        ],
      },
    ]
  },
  optimization: {
    // namedChunks: true,
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        extractComments: false,
        exclude: /(\.min\.js)$/,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          },
          output: {
            comments: false,
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true
    })
  ]
};