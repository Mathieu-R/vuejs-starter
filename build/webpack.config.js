const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css'
});

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
  })
];

const devServer = {
  contentBase: config.contentBase,
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  port: config.port.front,
  compress: production,
  inline: !production,
  hot: !production,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: true,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true
  }
}

if (production) {
  plugins.push(
    extractSass,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin({}, {
      comments: false
    }),
    // Compress extracted CSS.
    // Possible duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new htmlWebpackPlugin({
      template: config.template,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // make it work consistently with multiple chunks (CommonChunksPlugin)
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: config.entryAssetPath,
        to: config.outputAssetPath,
        ignore: ['.*']
      }
    ])
    //new BundleAnalyzerPlugin(), // analyse the bundles and their contents
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(), // hot reload
    new webpack.NoEmitOnErrorsPlugin(), // do not build bundle if they have errors
    new webpack.NamedModulesPlugin(), // print more readable module names in console on HMR,
    new htmlWebpackPlugin({ // generate index.html
      template: config.template,
    }),
    new FriendlyErrorsPlugin()
  );
};


const common = {
  devtool: config.devtool,
  entry: {
    app: config.entry.front,
    vendor: config.vendor
  },
  output: {
    path: path.resolve('../dist'),
    filename: production ? '[name].bundle.[hash].js' : '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: config.componentsPath,
      src: config.staticPath
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: production,
          postcss: [
            autoprefixer({browsers: ['last 3 versions']})
          ]
        }
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: 'babel-loader'
      }
    ]
  },
  performance: {
    hints: production ? 'warning' : false
  },
  plugins,
  devServer
};

module.exports = common;
