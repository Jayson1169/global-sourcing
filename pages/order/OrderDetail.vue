<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductDetail(item)">
				<view><image :src='item.product.photo'></image></view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='good_p'>
						<view class="good_price">¥ {{item.salePrice}}</view>
						<view class='i'>x {{item.quantity}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order">收货信息</view>
		<view class="cu-form-group">
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input v-model="order.address.name" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证号：</view>
			<input v-model="order.address.idNumber" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码：</view>
			<input v-model="order.address.phoneNumber" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址：</view>
			<input v-model="order.address.shipAddress" disabled></input>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {"id":5,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","salesperson":{"id":1,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"admin","password":"$2a$10$P8UFgtFSeCz.57PbNf2sRuOz2qg8JFJx9.wfJdNsX/7BuNzGvWeg2","name":"admin","role":"ADMIN","phoneNumber":null},"address":{"id":5,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","name":"test","idNumber":"111111111111111111","phoneNumber":"11111111111","shipAddress":"test"},"items":[{"id":9,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","product":{"id":9,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","name":"iPhone 13 Pro","barcode":"1111111111111","specification":"MLT83CH/A","image":null,"manufacturer":"富士康","origin":"中国","remark":"iPhone"},"salePrice":2,"quantity":2}]}
			};
		},
		onLoad(option) {
			this.order = JSON.parse(decodeURIComponent(option.order));
		},
		methods: {
			previewImage(image) {
				let preview = [];
				preview.push(image)
				uni.previewImage({
					current: 0,
					urls: preview
				});
			},
			jumpProductDetail(item) {
				uni.navigateTo({
					url: './ProductDetail?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.order {
		padding: 10px 10px 10px 10px;
	}
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	.goods_add {
		font-size: 13px;
		justify-content: center;
		align-items: center;
	}
	.tag-e {
		background-color:#fff;
		margin-bottom: 0px;
		font-size: 13px;
		.goods {
			display: flex;
			width: 100%;
			background-color: #ffffff;
			padding: 10px;
			box-sizing: border-box;
			border-bottom: 1px solid #EEF0EF;
		}
		.goods image {
			width: 162rpx;
			height: 162rpx;
		}
		.goods_02 {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			height: 160rpx;
			flex-grow: 1;
			justify-content: space-between;
			padding-top: 10rpx;
			padding-left: 25rpx;
		}
		.goods_title {
			max-height: 40px;
			overflow: hidden;
			line-height: 20px;
			font-weight: 600;
		}
		.goods_des {
			color: #979797;
		}
		.good_p { 
			display: flex;
			justify-content: space-between;
			.good_price {
				color: #F04E42;
				font-weight: 600;
			}
		}
	}
</style>
