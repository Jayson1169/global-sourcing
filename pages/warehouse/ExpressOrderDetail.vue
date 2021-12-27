<template>
	<view class="product">
		<view class="detail">商品明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of expressOrder.items" :key="index" @click="jumpExpressOrderItemDetail(item)">
				<view>
					<myimg :photo="item.product.image"></myimg>
				</view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='goods_des'>
						发货数量：{{item.deliveredQuantity}}
					</view>
					<view class='goods_des' v-if="item.receivedQuantity">
						接收数量：{{item.receivedQuantity}}
					</view>
				</view>
			</view>
		</view>
		<view class="detail">物流信息</view>
		<view class="cu-form-group">
			<view class="title">物流单号：{{expressOrder.expressNumber}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expressOrder: {
					items: [],
					expressNumber: ''
				}
			};
		},
		onLoad(option) {
			this.expressOrder = JSON.parse(decodeURIComponent(option.expressOrder));
		},
		methods: {
			jumpExpressOrderItemDetail(item) {
				uni.navigateTo({
					url: './ExpressOrderItemDetail?item='+encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.detail {
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
