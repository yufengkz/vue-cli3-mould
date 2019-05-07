const path = require("path")
//Gzip插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Webpack包文件分析器

// 拼接路径
function resolve(dir) {
	return path.join(__dirname, dir)
}

const times = new Date().getTime()

// 基础路径 注意发布之前要先修改这里 /lanjinrong-website-manager/manager/api/v1/
const baseUrl = ''  //二级目录设置

let env = process.env.VUE_APP_ENV
console.log('========================')
console.log(env)
console.log('========================')

module.exports = {
	publicPath: baseUrl, // 根据你的实际情况更改这里
	lintOnSave: true,
	devServer: {
		publicPath: baseUrl, // 和 baseUrl 保持一致
		open: true, // 是否自动打开浏览器页面
		https: false, // 使用https提供服务
		//proxy: 'http:// 192.168.2.95:7080/lite-mobile-customer/api/v1', // string | Object 代理设置
		//proxy: 'http://testqkkapi.kakahui.net/kakaka-wechat-customer/api/v1', // string | Object 代理设置
		compress: true, //一切服务都启用gzip 压缩
	},
	productionSourceMap: env == 'dev' ? true : false, //开发测试环境下快速定位错误信息
	outputDir: env ? "dist-" + env : "dist",
	//filenameHashing: true,
	// webpack 设置  chainWebpack:链式操作  configureWebpack：整体替换
	// 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
	chainWebpack: config => {
		//设置打包的文件名
		//config.output.filename = '[name].[id].js'  //不好使

        // config.output.chunkFilename(`js/[name].[id].[chunkhash:8].js`)
        // config.output.chunkFilename(`js/[name].[id].[chunkhash:8].js`)
        config.output.chunkFilename(`js/[name].js?time=`+times)

		// markdown
		config.module
			.rule("md")
			.test(/\.md$/)
			.use("text-loader")
			.loader("text-loader")
			.end();
		// image exclude
		config.module
			.rule("images")
			.test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
			.exclude.add(resolve("src/assets/svg-icons/icons"))
			.end()

		// 使用 alias 简化路径
		config.resolve.alias
			.set("@", resolve("src"))
			.set("components", resolve("src/components"))
			.set("view", resolve("src/views"))
			.set('_img', resolve('src/images'))  //~_img/xxxx

		config.output.filename('[name].[hash].js').end();
		//导入公用的less变量文件
		//const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		//types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

		// babel-polyfill 加入 entry
		const entry = config.entry("app")
		entry.add("babel-polyfill").end()
	},
	//build时分离css文件 不允许import方式引入css
	css: {
		// 配置高于chainWebpack中关于css loader的配置
		modules: true, // 是否开启支持‘foo.module.css’样式
		extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
		sourceMap: false, // 是否在构建样式地图，false将提高构建速度
		loaderOptions: {
			// css预设器配置项
			css: {
				localIdentName: '[name]-[hash]',
				camelCase: "only"
			},
			//公用的less文件，设置公用的less变量
			less: {
				javascriptEnabled: true
			},
			stylus: {}
		}
	},
	parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
	//开启Gzip压缩
	configureWebpack: config => {  // config => {}
		if (env !== 'dev') {
			// if(process.env.VUE_APP_ENV == 'production'){
			//     config.devtool = 'source-map'
			// }
			//config.output.path = path.resolve(__dirname, './server/assets/static');
			//config.output.publicPath = '../assets/static/';
			//config.output.filename = 'hkk-[name].js'
			config.plugins.push(new CompressionWebpackPlugin({
				filename: '[path].gz[query]',
				test: /\.js$|\.html$|.\css/, //匹配文件名
				threshold: 10240,//对超过10k的数据压缩
				deleteOriginalAssets: false, //不删除源文件
			}))
		}
	},

	//调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
	// configureWebpack: config => {
	// 	//生产and测试环境
	// 	let pluginsPro = [
	// 		new CompressionWebpackPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
	// 			filename: '[path].gz[query]',
	// 			algorithm: 'gzip',
	// 			test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
	// 			threshold: 8192,
	// 			minRatio: 0.8,
	// 		}),
	// 		//	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
	// 		new BundleAnalyzerPlugin(),
	// 	]
	// 	//开发环境
	// 	let pluginsDev = [
	// 		//移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
	// 		// new vConsolePlugin({
	// 		// 	filter: [], // 需要过滤的入口文件
	// 		// 	enable: true // 发布代码前记得改回 false
	// 		// }),
	// 	]
	// 	if(process.env.NODE_ENV !== 'dev') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
	// 		config.plugins = [...config.plugins, ...pluginsPro]
	// 	} else {
	// 		// 为开发环境修改配置...
	// 		config.plugins = [...config.plugins, ...pluginsDev]
	// 	}
	// },

	pluginOptions: {
		// 第三方插件配置
	},
	pwa: {
		// 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	},
	// 默认情况下，babel-loader 会排除 node_modules 依赖内部的文件。如果希望显性编译一个依赖的模块，你需要将其添加入 vue.config.js 中的 transpileDependencies 选项
	transpileDependencies: [
		// 可以是字符串或正则表达式
		'muse-ui',
	]
};

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, 'src/assets/css/variables.less'), // 需要全局导入的less
			],
		})
}
