const path = require('path')

// 拼接路径
function resolve(dir) {
	return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里 /lanjinrong-website-manager/manager/api/v1/
const baseUrl = ''

let env = process.env.VUE_APP_ENV
console.log(env);

module.exports = {
	baseUrl: baseUrl, // 根据你的实际情况更改这里
	lintOnSave: true,
	devServer: {
		publicPath: baseUrl, // 和 baseUrl 保持一致
		open: true,
	},
	productionSourceMap: false,
	outputDir: !!env ? 'dist-' + env : 'dist',
	// webpack 设置
	// 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
	chainWebpack: config => {
		// markdown
		config.module
			.rule('md')
			.test(/\.md$/)
			.use('text-loader')
			.loader('text-loader')
			.end()
		// image exclude
		const imagesRule = config.module.rule('images')
		imagesRule
			.test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
			.exclude
			.add(resolve('src/assets/svg-icons/icons'))
			.end()
		// 重新设置 alias
		config.resolve.alias
			.set('@', resolve('src'))
			.set('components', resolve('src/components'))
			.set('view', resolve('src/views'))
		// babel-polyfill 加入 entry
		const entry = config.entry('app')
		entry.add('babel-polyfill').end()
	},
	css: { // 配置高于chainWebpack中关于css loader的配置
		modules: true, // 是否开启支持‘foo.module.css’样式
		extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
		sourceMap: false, // 是否在构建样式地图，false将提高构建速度
		loaderOptions: { // css预设器配置项
			css: {
				localIdentName: '[name]-[hash]',
				camelCase: 'only'
			},
			stylus: {}
		}
	},
	parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
	pluginOptions: { // 第三方插件配置
	},
	pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	},
}
