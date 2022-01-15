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
						发货数量：{{item.quantity}}
					</view>
					<view class='goods_des' v-if="item.receivedQuantity">
						接收数量：{{item.receivedQuantity}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="expressOrder.status=='CREATED'">
			<view class="detail">物流明细</view>
			<view class="cu-form-group">
				<text :style="{color:'red'}">*</text>
				<view class="title">物流单号：</view>
				<input placeholder="请扫描或输入物流单号" v-model="expressOrder.expressNumber"></input>
				<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
			</view>
			<view class="cu-form-group">
				<text :style="{color:'red'}">*</text>
				<view class="title">物流公司：</view>
				<input placeholder="请输入物流公司" v-model="expressOrder.expressCompany"></input>
			</view>
			<view class="H50"></view>
			<view class="o_btn">
				<view class="flex flex-direction">
					<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">上传物流信息</button>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="detail">物流明细</view>
			<view class="cu-form-group">
				<view class="title">物流单号：</view>
				<input v-model="expressOrder.expressNumber" disabled="true" style="color: #000000;" @click="jumpLogistics(expressOrder.expressNumber)"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">物流公司：{{expressOrder.expressCompany}}</view>
			</view>
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
			},
			sub() {
				let rules = [
					{name: 'expressNumber', type: 'required', errmsg: '请输入物流单号'},
					{name: 'expressNumber', type: 'expressNumber', errmsg: '请正确输入物流单号'},
					{name: 'expressCompany', type: 'required', errmsg: '请输入物流公司'},
				]
				let valLoginRes = this.$validate.validate(this.expressOrder, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/expressOrder/deliver', this.expressOrder).then(res => {
						this.$api.msg.successToast('上传成功').then(res => {
							uni.navigateTo({
								url: './ExpressOrder'
							});
						})
					}, error => {
						this.$api.msg.toast(error);
					})
				}	
			},
			jumpLogistics(expressNumber) {
				uni.navigateTo({
					url: '../Logistics?expressNumber='+expressNumber
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.o_btn {
		background: #FFFFFF;
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
