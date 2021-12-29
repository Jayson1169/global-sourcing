<template>
	<view class="product">		
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<selectlay :value="item.product.name" name="name" placeholder="请选择或搜索商品" :showplaceholder="false" slabel="name" svalue="id" @selectitem="selectitem"></selectlay>
		</view>
		<view class="cu-form-group" v-if="item.product.brand">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品品牌：{{item.product.brand}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.specification">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品型号：{{item.product.specification}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.barcode">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品条码：{{item.product.barcode}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.image">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品图片：</view>
			<myimg :photo="item.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="item.product.manufacturer">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">生产厂家：{{item.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.origin">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">生产地区：</view>
			<input v-model="item.product.origin" disabled></input>
		</view>
		<view class="cu-form-group" v-if="item.product.remark">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">备注信息：</view>
			<input v-model="item.product.remark" disabled></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
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
					quantity: '',
					salePrice: ''
				}
			}
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
			selectitem(index, item) {
				if (index >= 0) {
					this.$api.http.get('/product/getImage?id='+item.id, null).then(res => {
						item.image = res;
						this.item.product = item;
					})
				} else {
					this.item.product = ""
				}
			},
			sub() {
				let productForm = this.item.product;
				productForm.price = this.item.price;
				productForm.quantity = this.item.quantity;
				let rules = [
					{name: 'name', required: true, type: 'required', errmsg: '请选择或搜索商品'},
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
	.cu-form-group .title {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		/* add */
		flex: 0 0 150upx;
	}
</style>
