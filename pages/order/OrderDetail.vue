<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductDetail(item)">
				<view class='goods_02'>
				  <view class='goods_title'>{{item.product.name}}</view>
				  <!-- 可以循环显示多个属性 此处修改为显示单独描述 -->
				  <!-- <view class="goods_des">{{item.guige[0].name}}：{{item.guige[0].value}}</view> -->
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
				// order: {}
			};
		},
		onLoad(option) {
			this.order = JSON.parse(decodeURIComponent(option.order));
		},
		methods: {
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
	}
</style>
