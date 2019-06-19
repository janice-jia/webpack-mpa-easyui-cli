
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 是开发环境
const ISDEV = process.env.NODE_ENV === 'development';


const HTMLReg = /.html/;
// 生成多个页面entry
function createMultiEntry(){
  var _tmpEntry = {};

  // 遍历生成入口entry
  glob.sync('src/views/**/*.html').map(path => {
    var _origin = path.substr(0, path.match(HTMLReg)['index']); 
    _tmpEntry[_origin.replace(/\//g, '$')] = './' + _origin + '.js';
  });

  return _tmpEntry;
}

// 生成多个页面html
function createMultiHtmlPluginInsts(){
  var _hWPInsts = [];

  // 遍历生成入口entry
  glob.sync('src/views/**/*.html').map(path => {
    var _origin = path.substr(0, path.match(HTMLReg)['index']); 
    _hWPInsts.push(
      new HtmlWebpackPlugin({
        filename: _origin.substr('src/'.length) + '.html',
        template: _origin + '.html',
        // 只注入需要的chunk
        chunks: [_origin.replace(/\//g, '$')]
      })
    )
  });

  return _hWPInsts;
}

// 生产打包的时候，需要额外使用的plugin
function createUseProdPluginInsts(){
  
  if(ISDEV){
    return [];
  }

  let _tmp = [];
  _tmp.push(    
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    })
  )
  return _tmp;
}

module.exports = {
  entry: Object.assign(
    {
      // 首页的entry
      index: './src/index.js'
    }, 
    // 业务页面的entry
    createMultiEntry()),
  output: {
    // filename: 'js/[chunkhash].js',
    filename () {
      if (ISDEV) {
        return '[name].js'
      }

      return 'js/[chunkhash].js'
    },
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    port: 5500,
    proxy: {
      '/cloudfi': 'http://127.0.0.1:9094'
    }
  },
  // 报错信息:(在开发环境下)追踪到源文件
  devtool: ISDEV ? 'inline-source-map' : '', 
  plugins: [
    new CleanWebpackPlugin(),
    // 拷贝lib文件夹
    new CopyWebpackPlugin([
      { from: 'src/lib', to: 'lib' }
    ]),
    // 首页
    new HtmlWebpackPlugin({
      title: '代码分离',
      // 发布的名字
      filename: 'index.html',
      // 源代码的模板路径
      template: 'src/index.html',
      // 只注入需要的chunk
      chunks: ['index']
    }),
  ].concat(createMultiHtmlPluginInsts()).concat(createUseProdPluginInsts()),
  module: {
    rules: [
      {
        // 转换es6
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|lib)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /lib/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /lib/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name () {
                if (ISDEV) {
                  return '[path][name].[ext]'
                }
          
                return '[path].[contenthash:7].[ext]'
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /lib/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: !ISDEV,
            removeComments: !ISDEV
          }
        }
      }
    ]
  },
  externals: {
    // value 使用的全局变量 window.tools,每次build之后，拷贝libs文件夹
    $: 'window.$'
  }
}