<template>
	<view>
		<image :src='photo' :style="padding?style1:style2" mode="aspectFill" @click="previewImage" lazy-load="true">
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../common/img-tool.js'
	export default {
		name:"my-img",
		props: {
			style1: {
				type: String,
				default: 'width:162rpx;height:162rpx;margin:10rpx 10rpx 10rpx 0rpx;'
			},
			style2: {
				type: String,
				default: 'width:162rpx;height:162rpx'
			},
			padding: false,
			photo: ''
		},
		methods: {
			previewImage() {
				let that = this;
				uni.showLoading({
					title: "加载中..."
				})
				base64ToPath(that.photo).then(path => {
					let imgs = [];
					uni.hideLoading()
					imgs[0] = path;
					uni.previewImage({
						current: 0,
						urls: imgs
					});
				})
				.catch(error => {
					// 图片加载失败
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
