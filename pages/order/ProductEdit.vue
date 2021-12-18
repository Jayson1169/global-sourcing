<template>
	<view class="product">		
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="item.product.name"></input>
		</view>
	<!-- 	<view class="cu-form-group">
			<view class="title"><text :style="{color:'red'}">*</text>商品品牌：</view>
			<input placeholder="请输入商品品牌" v-model="item.product.brand"></input>
		</view> -->
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品型号：</view>
			<input placeholder="请输入商品型号" v-model="item.product.specification"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">生产厂家：</view>
			<input placeholder="请输入生产厂家" v-model="item.product.manufacturer"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">生产地区：</view>
			<input placeholder="请输入生产地区" v-model="item.product.origin"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">备注信息：</view>
			<input placeholder="请输入备注信息" v-model="item.product.remark"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">销售价格：</view>
			<input type="digit" placeholder="请输入销售价格" v-model="item.salePrice" @input="checkPrice"></input>
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
						name: 'iPhone 13 Pro',
						// brand: 'Apple',
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
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			checkPrice: function(e) {
				//正则表达式
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input				
				this.$nextTick(() => {
					this.item.salePrice = e.target.value
				})
			},
			sub: function(e) {
				let productForm = this.item.product;
				productForm.salePrice = this.item.salePrice;
				productForm.quantity = this.item.quantity;
				let rules = [
					{name: 'name', required: true, type: 'required', errmsg: '请输入商品名称'},
					// {name: 'brand', required: true, type: 'required', errmsg: '请输入商品品牌'},
					{name: 'specification', required: true, type: 'required', errmsg: '请输入商品型号'},
					// {name: 'manufacturer', required: true, type: 'required', errmsg: '请输入生产厂家'},
					{name: 'salePrice', required: true, type: 'required', errmsg: '请输入销售价格'},
					{name: 'quantity', required: true, type: 'required', errmsg: '请输入销售数量'}
				]
				let valLoginRes = this.$validate.validate(productForm, rules)
				if (!valLoginRes.isOk) {
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
	.p_btn {
		width: 50%; 
		margin: 5px;
	}
	.p_btn_group {
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
	}
</style>
