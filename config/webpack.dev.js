const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

// function generateHtmlPlugins(templateDir) {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//   return templateFiles.map(item => {
//     const parts = item.split(".");
//     const name = parts[0];
//     const extension = parts[1];
//     return new HtmlWebpackPlugin({
//       filename: `${name}.html`,
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//       inject: false
//     });
//   });
// }

// const htmlPlugins = generateHtmlPlugins("../src/html/");

module.exports = {
  entry: {
    main: "./src/app/index.js"
    // landing: "./src/app/landing.js"
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].bundle.js",
    library: "my-library",
    libraryTarget: "umd"
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    compress: true,
    port: 3000,
    overlay: true
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // transpiling our JavaScript files using Babel and webpack
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader", // Loader for webpack to process CSS with PostCSS
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"]
              }
            }
          } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|.mp3)$/,
        use: [
          {
            loader: "file-loader", // This will resolves import/require() on a file into a url and emits the file into the output directory.
            options: {
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", ":data-src"],
            minimize: true
          }
        }
      }
    ]
  },
  plugins: [
    // CleanWebpackPlugin will do some clean up/remove folder before build
    // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
    new CleanWebpackPlugin({}),
    // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html"
    })
    // new HtmlWebpackPlugin({
    //   template: "./src/landing.html",
    //   filename: "landing.html",
    //   inject: true,
    //   chunks: ["landing"]
    // })
  ]
};
