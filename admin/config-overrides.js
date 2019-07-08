const path = require("path");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  stylesDir: path.join(__dirname, "./src/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/styles/vars.less"),
  mainLessFile: path.join(__dirname, "./src/styles/main.less"),
  themeVariables: ["@primary-color"],
  indexFileName: "index.html",
  generateOnce: false // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addLessLoader({
    modifyVars: {},
    javascriptEnabled: true
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options))
);
