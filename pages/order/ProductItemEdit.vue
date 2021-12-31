<template>
	<view class="product">		
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品名称：{{item.product.name}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.brand">
			<view class="cu-form-title">商品品牌：{{item.product.brand}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.specification">
			<view class="cu-form-title">商品型号：{{item.product.specification}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.barcode">
			<view class="cu-form-title">商品条码：{{item.product.barcode}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.image">
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
		<view class="cu-form-group" v-if="item.product.barcode">
			<view class="cu-form-title">商品库存：{{item.product.inventory.warehouseInventory}}</view>
		</view>
		<view class="detail">销售明细</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">成交价格：</view>
			<input type="digit" placeholder="请输入成交价格" v-model="item.price" @input="checkPrice"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">销售数量：</view>
			<input type="number" placeholder="请输入销售数量" v-model="item.quantity"></input>
		</view>
		<view class="H50"></view>
		<view class="p_btn_group">
			<button class="p_btn cu-btn bg-red margin-tb-sm lg" @click="sub('delete')" id="1">删除</button>
			<button class="p_btn cu-btn bg-green margin-tb-sm lg" @click="sub('modify')" id="2">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					product: {
						photo: null,
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
					price: '2.00'
				}
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
			this.item.price = this.item.salePrice / 100;
		},
		methods: {
			checkPrice: function(e) {
				//正则表达式
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input				
				this.$nextTick(() => {
					this.item.price = e.target.value
					this.item.salePrice = this.item.price * 100
				})
			},
			sub: function(e) {
				let rules = [
					{name: 'price', required: true, type: 'required', errmsg: '请输入销售价格'},
					{name: 'quantity', required: true, type: 'required', errmsg: '请输入销售数量'}
				]
				let valLoginRes = this.$validate.validate(this.item, rules)
				if (!valLoginRes.isOk && e != 'delete') {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					uni.navigateBack()
					uni.$emit(e, this.item)
				}	
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
	.p_btn_group {
		background-color: #F7F6FB;
		padding: 0rpx 20rpx 0rpx 20rpx;
		display: flex;			
		position: fixed;
		bottom: 0;
		z-index: 9999;
		width: 100%;
		justify-content: space-between;
		.p_btn {
			width: 345rpx; 
		}
	}
	.detail {
		padding: 10px 10px 10px 10px;
	}
	.cu-form-group .title {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		/* add */
		flex: 0 0 150rpx;
	}
</style>
