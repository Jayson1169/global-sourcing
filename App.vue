<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		}, 
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
    @import "colorui/main.css";
    @import "colorui/icon.css";
    @import "./common/uni.css";
	@import "colorui/iconfont.css"
</style>
