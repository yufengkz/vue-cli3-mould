<template>
	<div id="app">
		<div id="nav">
			<router-link to="/home">Home</router-link>
			|
			<router-link to="/about">About</router-link>
		</div>
		<transition name="slide-fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<style lang="less">
	/* IOS禁止微信调整字体大小 */
	body {
		-webkit-text-size-adjust: 100% !important;
	}
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		max-width: 750px;
		min-width: 320px;
		margin: 0 auto;
	}

	#nav {
		padding: 30px;
		a {
			font-weight: bold;
			color: #2c3e50;
			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-fade-enter-active {
		transition: all 0.3s ease;
	}
	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.slide-fade-enter, .slide-fade-leave-to{
		transform: translateX(10px);
		opacity: 0;
	}
</style>
