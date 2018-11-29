const path = require("path")
//Gzip插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 用于做相应的合并处理
const merge = require('webpack-merge')

// 拼接路径
function resolve(dir) {
	return path.join(__dirname, dir);
}

// 基础路径 注意发布之前要先修改这里 /lanjinrong-website-manager/manager/api/v1/
const baseUrl = ''  //二级目录设置

let env = process.env.VUE_APP_ENV
console.log(env);

module.exports = {
	baseUrl: baseUrl, // 根据你的实际情况更改这里
	lintOnSave: true,
	devServer: {
		publicPath: baseUrl, // 和 baseUrl 保持一致
		open: true, // 是否自动打开浏览器页面
		https: false, // 使用https提供服务
		proxy: null, // string | Object 代理设置
		compress: true, //一切服务都启用gzip 压缩
	},
	productionSourceMap: true, //环境下快速定位错误信息
	outputDir: env ? "dist-" + env : "dist",
	// webpack 设置  chainWebpack:链式操作  configureWebpack：整体替换
	// 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
	chainWebpack: config => {
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
			.end();

		// 使用 alias 简化路径
		config.resolve.alias
			.set("@", resolve("src"))
			.set("components", resolve("src/components"))
			.set("view", resolve("src/views"))
			.set('_img', resolve('src/images'))

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
				localIdentName: "[name]-[hash]",
				camelCase: "only"
			},
			stylus: {}
		}
	},
	parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
	//开启Gzip压缩
	configureWebpack: config => {
		if (process.env.VUE_APP_ENV !== 'dev') {
			return {
				plugins: [new CompressionWebpackPlugin({
					test: /\.js$|\.html$|.\css/, //匹配文件名
					threshold: 10240,//对超过10k的数据压缩
					deleteOriginalAssets: false //不删除源文件
				})]
			}
		}
	},
	pluginOptions: {
		// 第三方插件配置
	},
	pwa: {
		// 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	}
};
