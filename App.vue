<script>
export default {
	globalData: {
		settings: {},
		email:[
			'@qq.com',
			'@163.com',
			'@126.com',
			'@sina.com',
			'@sohu.com',
			'@yeah.net',
			'@139.com',
			'@189.cn'
		]
	},
	onLaunch: function() {
		this.$api.get_settings('Get').then(res => {
			this.globalData.settings = res.data;
		});
		uni.setStorage({
			key: 'miniProgram',
			data: uni.getAccountInfoSync()
		});
	},
	onShow: () => {
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			if (res.hasUpdate) {
				updateManager.onUpdateReady(function(res2) {
					uni.showModal({
						title: '更新提示',
						content: '发现新版本，是否重启应用?',
						cancelColor: '#eeeeee',
						confirmColor: '#FF0000',
						success(res2) {
							if (res2.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
			}
		});
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
			uni.showModal({
				title: '提示',
				content: '检查到有新版本，但下载失败，请检查网络设置',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
	}
};
</script>

<style lang="scss">
@import '@/static/css/rich_text.scss';
@import '@/static/css/style.scss';
</style>
