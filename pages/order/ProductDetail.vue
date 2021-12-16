<template>
	<view class="product">		
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>商品名称：</view>
			<input placeholder="请输入商品名称" v-model="item.product.name" disabled></input>
		</view>
	<!-- 	<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>商品品牌：</view>
			<input placeholder="请输入商品品牌" v-model="item.product.brand"></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>商品型号：</view>
			<input placeholder="请输入商品型号" v-model="item.product.specification" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'white'}">*</text>生产厂家：</view>
			<input placeholder="未输入生产厂家" v-model="item.product.manufacturer" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'white'}">*</text>生产地区：</view>
			<input placeholder="未输入生产地区" v-model="item.product.origin" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'white'}">*</text>备注信息：</view>
			<input placeholder="未输入备注信息" v-model="item.product.remark" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>销售价格：</view>
			<input v-model="item.salePrice" @input="checkPrice" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>销售数量：</view>
			<input v-model="item.quantity" @input="checkQuantity" disabled></input>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				item: {
					product: {
						name: 'iPhone 13 Pro',
						brand: 'Apple',
						specification: 'MLT83CH/A',
						manufacturer: '富士康',
						origin: '中国',
						remark: 'iPhone',
					},
					salePrice: '2',
					quantity: '2'
				}
			}
		},
		methods: {
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
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
