<template>
	<view class="product">		
		<view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="item.product.name" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：</view>
			<input placeholder="请输入商品型号" v-model="item.product.specification" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产厂家：</view>
			<input placeholder="未输入生产厂家" v-model="item.product.manufacturer" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产地区：</view>
			<input placeholder="未输入生产地区" v-model="item.product.origin" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">备注信息：</view>
			<input placeholder="未输入备注信息" v-model="item.product.remark" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售价格：</view>
			<input v-model="item.salePrice" @input="checkPrice" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售数量：</view>
			<input v-model="item.quantity" @input="checkQuantity" disabled></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">快递物流：</view>
			<input placeholder="请扫描或输入物流单号" v-model="item.number"></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">发送</button>
			</view>
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
					quantity: '2',
					number: ''
				},
				
			}
		},
		methods: {
			getScanCode() {
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						this.item.number = res.result
					}
				})
			},
			sub() {
				uni.navigateBack()
				uni.$emit('send', this.item)
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
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
