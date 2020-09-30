<script>
export default {
	globalData: {
		settings: {}
	},
	onLaunch: function() {
		this.$api.get_settings('get').then(res => {
			this.globalData.settings = res.data;
		});
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
@import '@/static/css/rich_text.scss';
@import '@/static/css/style.scss';
</style>
