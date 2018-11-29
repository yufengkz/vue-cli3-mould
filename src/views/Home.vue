<template>
	<div>
		<mu-container class="button-wrapper">
			<mu-button color="secondary" v-loading="loading1" :disabled="disabled" data-mu-loading-size="24" @click="loading">按钮loading
			</mu-button>
			<mu-button color="success" @click="fullscreen()">全屏loading</mu-button>
			<hr>
			<mu-button @click="show4 = !show4">Click Me</mu-button>
			<mu-flex class="mu-transition-row">
				<mu-scale-transition>
					<div class="mu-transition-box mu-primary-color mu-inverse" v-show="show4">mu-scale-transition</div>
				</mu-scale-transition>
			</mu-flex>
		</mu-container>
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		props: {
			msg: String
		},
		data() {
			return {
				loading1: false,
				disabled: false,
				show4: true
			}
		},
		mounted() {
			this.get();
		},
		methods: {
			get() {
				this.$axios.post("/newindex", {token: "", osName: "H5", appVersion: 1}).then(res => {
					//console.log(res)
				})
			},
			loading() {
				this.loading1 = true
				this.disabled = true
				setTimeout(() => {
					this.loading1 = false
					this.disabled = false
				}, 3000)
			},
			fullscreen() {
				const loading = this.$loading();
				setTimeout(() => {
					loading.close();
				}, 2000)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.button-wrapper {
		text-align: center;
		.mu-button {
			margin: 8px;
		}

		.btn {
			width: 6rem;
		}

		.mu-transition-row {
			margin-top: 16px;
			height: 100px;
		}
		.mu-transition-box {
			min-width: 200px;
			height: 100px;
			margin-right: 16px;
			border-radius: 4px;
			padding: 0 16px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
