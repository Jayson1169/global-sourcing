<template>
	<view>
		<view class="detail">采购明细</view>
		<view class="cu-form-group">
			<view class="title">采购照片：</view>
			<myimg :photo="purchaseOrder.photo" :padding="true"></myimg>
		</view>
		<view class="cu-form-group">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<myimg :photo="purchaseOrder.invoice" :padding="true"></myimg>
		</view>
		<view class="cu-form-group">
			<view class="title">发票日期：{{purchaseOrder.invoiceDate}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">采购单价：{{purchaseOrder.purchasePrice / 100}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">已采购数量：{{purchaseOrder.purchasedQuantity}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">应采购数量：{{purchaseOrder.quantity}}</view>
		</view>
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<view class="title">商品名称：{{purchaseOrder.product.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品品牌：{{purchaseOrder.product.brand}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：{{purchaseOrder.product.specification}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品条码：{{purchaseOrder.product.barcode}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品图片：</view>
			<myimg :photo="purchaseOrder.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.manufacturer">
			<view class="title">生产厂家：{{purchaseOrder.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.origin">
			<view class="title">生产地区：{{purchaseOrder.product.origin}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.remark">
			<view class="title">备注信息：{{purchaseOrder.product.remark}}</view>
		</view>
		<view class="detail">接收信息</view>
		<view class="cu-form-group">
			<view class="title">已接收数量：{{purchaseOrder.warehousedQuantity}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">接收数量：</view>
			<input placeholder="请扫码确定接收数量" v-model="number" disabled></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">确定接收</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				purchaseOrder: [],
				number: '0'
			};
		},
		onLoad(option) {
			this.purchaseOrder = JSON.parse(decodeURIComponent(option.purchaseOrder));
		},
		methods: {
			sub() {
				let _this = this;
				uni.showModal({
					title: '确定接收数量',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					placeholderText: _this.number,
					success: function(res) {
						if (res.confirm) {
							var quantity = res.content==''?_this.number:res.content;
							_this.$api.http.put('/purchaseOrder/putIntoWarehouse?id='+_this.purchaseOrder.id+'&quantity='+quantity, null).then(res => {
								_this.$api.msg.successToast('接收成功').then(res => {
									uni.navigateTo({
										url: '../warehouse/WarehouseKeeper'
									})
								})
							}, error => {
								_this.$api.msg.toast(error)
							})
						}
					}
				});
			},
			getScanCode() {
				let _this = this;
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						if (res.result == _this.purchaseOrder.product.barcode) {
							uni.showToast({
								title: '扫描成功,商品为:'+_this.purchaseOrder.product.name,
								icon: 'none'
							})
							_this.number += 1;
						} else {
							uni.showToast({
								title: '可能不是该商品',
								icon: 'none'
							})
						}
					}
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
</style>
