<template>
	<view class="product">		
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品名称：{{item.product.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品品牌：{{item.product.brand}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品型号：{{item.product.specification}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品条码：{{item.product.barcode}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品图片：</view>
			<myimg :photo="item.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="item.product.manufacturer">
			<view class="cu-form-title">生产厂家：{{item.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.origin">
			<view class="cu-form-title">生产地区：</view>
			<input v-model="item.product.origin" disabled></input>
		</view>
		<view class="cu-form-group" v-if="item.product.remark">
			<view class="cu-form-title">备注信息：</view>
			<input v-model="item.product.remark" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品库存：{{item.product.inventory.warehouseInventory}}</view>
		</view>
		<view class="detail">物流信息</view>
		<view class="cu-form-group">
			<view class="cu-form-title">发货数量：{{item.deliveredQuantity}}</view>
		</view>
		<view class="detail" v-if="item.receivedQuantity">接收信息</view>
		<view class="cu-form-group" v-if="item.receivedQuantity">
			<view class="title">接收数量：{{item.receivedQuantity}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					product: {
						image: null,
						name: '',
						brand: '',
						specification: '',
						barcode: '',
						manufacturer: '',
						origin: '',
						remark: '',
					},
					deliveredQuantity: ''
				},
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
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
</style>
