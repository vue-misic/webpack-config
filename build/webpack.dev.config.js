const webpack = require('webpack');
const { resolve } = require('./utils')
const { BUILD_TYPE } = process.env;
let VUE_APP_GATEWAY = '';
if (BUILD_TYPE === 'fat') {
	VUE_APP_GATEWAY = '1111';
}
if (BUILD_TYPE === 'uat') {
	VUE_APP_GATEWAY = '2222';
}
if (BUILD_TYPE === 'prod') {
	VUE_APP_GATEWAY = '3333';
}
module.exports = {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	output: {
		filename: '[name].js',
		pathinfo: true,
		hotUpdateChunkFilename: '[hash].hot-update.js',
	},
	module: {
    rules: [
      {
        test: /\.(scss|less|css)$/,
        use: [
					'style-loader',
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
      }
    ]
  },
	devServer: {
		host: '0.0.0.0',
		port: '9090',
		clientLogLevel: 'warning',
		historyApiFallback: true,
		compress: true,
		inline: true,
		contentBase: resolve('dist'),
		open: true,
		hot: true,
		useLocalIp: true,
		overlay: {
      warnings: true,
      errors: true
    },
		proxy: {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
			},
			// 接口代理
		},
	}
}