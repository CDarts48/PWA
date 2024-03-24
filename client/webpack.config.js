const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.'bundle.js'
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    //based on my file structure
    plugins: [
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Great Title",
      }),
      new WebpackPwaManifest({
        name: "Note Taker",
        short_name: "all stuff",
        description: "An app for taking notes",
        background_color: "#272822",
        theme_color: "#31a9e1",
        start_url: "./",
        publicPath: "./",
        fingerprints: false,
        inject: true,
        icons: [{
          src: path.resolve("src/images/logo.png"),
          sizes: [
            96, 128, 192, 256, 384, 512
          ],
        destination: path.join("assets", "icons")
        }],
      }),
    ],

    module: {
      rules: [
        // CSS and SASS files
        {
          test: /\.(sa|sc|c)ss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        // JavaScript files
        {
          //change test upon mjs add in to test MINIPROJECT
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
