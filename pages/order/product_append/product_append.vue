<template>
	<view class="product">		
		<view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="product_form.product" focus></input>
		</view>
		<view class="cu-form-group">
			<view class="title">订&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</view>
			<input placeholder="请输入订金" v-model="product_form.deposit"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售价格：</view>
			<input placeholder="请输入销售价格" v-model="product_form.sale_price"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">成交价格：</view>
			<input placeholder="请输入成交价格" v-model="product_form.transaction_price"></input>
		</view>
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
				product_form: {
					product: '',
					deposit: '',
					sale_price: '',
					transaction_price: ''
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
