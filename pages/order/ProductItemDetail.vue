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
			<view class="cu-form-title">生产地区：{{item.product.origin}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.remark">
			<view class="cu-form-title">备注信息：{{item.product.remark}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品库存：{{item.product.inventory.warehouseInventory}}</view>
		</view>
		<view class="detail">销售明细</view>
		<view class="cu-form-group">
			<view class="cu-form-title">成交价格：{{item.price}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">销售数量：{{item.quantity}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					product: {
						photo: 'data:image/jpeg;base64,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',
						name: 'iPhone 13 Pro',
						brand: 'Apple',
						specification: 'MLT83CH/A',
						barcode: '1111111111111',
						manufacturer: '富士康',
						origin: '中国',
						remark: 'iPhone',
					},
					salePrice: '200',
					quantity: '2',
					price: '2'
				}
			}
		},
		methods: {
			previewImage(image) {
				let preview = [];
				preview.push(image)
				uni.previewImage({
					current: 0,
					urls: preview
				});
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
			this.item.price = this.item.salePrice / 100;
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	.detail {
		padding: 10px 10px 10px 10px;
	}
</style>
