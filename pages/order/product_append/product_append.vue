<template>
	<view class="product">		
		<view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="item.product.name" focus></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品品牌：</view>
			<input placeholder="请输入商品品牌" v-model="item.product.brand" focus></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：</view>
			<input placeholder="请输入商品型号" v-model="item.product.specification"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产商家：</view>
			<input placeholder="请输入生产商家" v-model="item.product.manufacturer"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产地区：</view>
			<input placeholder="请输入生产地区" v-model="item.product.origin"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">备注信息：</view>
			<input placeholder="请输入备注信息" v-model="item.product.remark"></input>
		</view>
	<!-- 	<view class="cu-form-group">
			<view class="title">订&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</view>
			<input placeholder="请输入订金" v-model="product_form.deposit"></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title">销售价格：</view>
			<input placeholder="请输入销售价格" v-model="item.salePrice"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售数量：</view>
			<input placeholder="请输入销售数量" v-model="item.quantity"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">成交价格：</view>
			<input placeholder="请输入成交价格" v-model="product_form.transaction_price"></input>
		</view> -->
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">添加商品</button>
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
						name: '1',
						brand: '2',
						specification: '2',
						manufacturer: '2',
						origin: '2',
						remark: '2',
					},
					salePrice: '2',
					quantity: '2'
				}
			}
		},
		methods: {
			sub() {
				uni.navigateBack()
				uni.$emit('item', this.item)
			}
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
