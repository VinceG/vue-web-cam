var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { version } = require("../package.json");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "index.js",
    library: "vue-web-cam",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    vue: "vue"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version),
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};
