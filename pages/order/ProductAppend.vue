<template>
	<view class="product">		
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<select-lay :value="item.product.name" name="name" placeholder="请选择或搜索商品" :showplaceholder="false" slabel="name" svalue="id" @selectitem="selectitem"></select-lay>
		</view>
<!-- 		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="item.product.name"></input>
		</view> -->
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品品牌：</view>
			<input placeholder="请输入商品品牌" v-model="item.product.brand"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品型号：</view>
			<input placeholder="请输入商品型号" v-model="item.product.specification"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品条码：</view>
			<input placeholder="请扫描或输入商品条码" v-model="item.product.barcode"></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品图片：</view>
			<upimg @photo="getPhoto" :photo="item.product.image" ref="upimg"></upimg>
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
						image: null,
						name: '',
						brand: '',
						specification: '',
						barcode: '',
						manufacturer: '',
						origin: '',
						remark: '',
						inventory: {
							warehouseInventory: '',
							midwayInventory: '',
							hubInventory: ''
						}
					},
					price: '',
					quantity: ''
				}
			}
		},
		methods: {
			getPhoto(val) {
				this.item.product.image = val
			},
			checkPrice: function(e) {
				//正则表达式
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input				
				this.$nextTick(() => {
					this.item.price = e.target.value
				})
			},
			getScanCode() {
				let _this = this;
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						_this.item.product.barcode = res.result
					}
				})
			},
			selectitem(index, item) {
				if (index >= 0) {
					this.item.product = item;
					this.$refs.upimg.loadImage(this.item.product.image);
				} else {
					this.item.product = ""
				}
			},
			sub() {
				let productForm = this.item.product;
				productForm.price = this.item.price;
				productForm.quantity = this.item.quantity;
				let rules = [
					{name: 'image', required: true, type: 'required', errmsg: '请上传商品图片'},
					{name: 'name', required: true, type: 'required', errmsg: '请输入商品名称'},
					{name: 'brand', required: true, type: 'required', errmsg: '请输入商品品牌'},
					{name: 'specification', required: true, type: 'required', errmsg: '请输入商品型号'},
					{name: 'barcode', required: true, type: 'required', errmsg: '请输入商品条码'},
					{name: 'price', required: true, type: 'required', errmsg: '请输入销售价格'},
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
					uni.$emit('append', this.item)
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
	.detail {
		padding: 10px 10px 10px 10px;
	}
</style>
