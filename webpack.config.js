const path = require("path");
module.exports = {
  // 模块的入口文件
  entry: "./src/index.js",
  mode: "production",
  output: {
    // 输出文件的名称
    filename: "index.js",
    // 输 文件的存放目
    path: path.resolve(__dirname, "lib"),
    // 输出的代码符合 CommJS 模块化规范，以供给其他模块导入使用
    globalObject: "this", //添加这个才能支持node的commonjs
    library: {
      name: "watermark",
      type: "umd",
      export: "default", // 添加这个解决es6的export default导出属性要加default才能访问到问题
    },
  },
  // 通过正则命中所有以 react 或者 babel- runtime 开头的模块，
  // 这些模块通过注册在运行环境中的全局变量访问，不能被打包进输出的代码里，防止它们出现多次
  module: {
    rules: [
      {
        test: /\.js$/,
        // cache Directory 表示传给 babel-loader 的参数，用于缓存 babel 的编译结果，
        // 加快重新编译的速度
        use: ["babel-loader?cacheDirectory"],
        // 排除 node modules 目录下的文件，
        //node modules 目录下的文件都采用了 ESS 语法，没必要再通过 Bab el 转换。
        exclude: path.resolve(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [],
  // 输出 Source Map
  devtool: "source-map",
};
