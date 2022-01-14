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
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	
	/*每个页面公共css */
    @import "colorui/main.css";
	@import "colorui/iconfont.css";
    @import "@/common/uni.css";
</style>
