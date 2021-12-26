<template>
	<view class="product">		
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="product.name"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品品牌：</view>
			<input placeholder="请输入商品品牌" v-model="product.brand"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品型号：</view>
			<input placeholder="请输入商品型号" v-model="product.specification"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品条码：</view>
			<input placeholder="请扫描或输入商品条码" v-model="product.barcode"></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">HS Code：</view>
			<input placeholder="请输入HS Code" v-model="product.customsInfo.hsCode"></input>
		</view>	
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">Material Beschaffenheit：</view>
			<input placeholder="请输入Material Beschaffenheit" v-model="product.customsInfo.materialBeschaffenheit"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">Brand Article no.：</view>
			<input placeholder="请输入Brand Article no." v-model="product.customsInfo.brandArticleNo"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">Brand：</view>
			<input placeholder="请输入Brand" v-model="product.customsInfo.brand"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">Article Name：</view>
			<input placeholder="请输入Article Name" v-model="product.customsInfo.articleName"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品图片：</view>
			<upimg @photo="getPhoto" :photo="product.image"></upimg>
		</view>
	<!-- 	<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="p_title">销售价格（优质客户）：</view>
			<input type="digit" placeholder="请输入销售价格" v-model="product.salePrice" @input="checkPrice"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="p_title">销售价格（普通客户）：</view>
			<input type="digit" placeholder="请输入销售价格" v-model="product.salePrice" @input="checkPrice"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="p_title">销售价格（批量采购）：</view>
			<input type="digit" placeholder="请输入销售价格" v-model="product.salePrice" @input="checkPrice"></input>
		</view> -->
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">国外库存：</view>
			<input type="number" placeholder="请输入国外库存" v-model="product.inventory.warehouseInventory"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">在途库存：</view>
			<input type="number" placeholder="请输入在途库存" v-model="product.inventory.midwayInventory"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">国内库存：</view>
			<input type="number" placeholder="请输入国内库存" v-model="product.inventory.hubInventory"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">生产厂家：</view>
			<input placeholder="请输入生产厂家" v-model="product.manufacturer"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">生产地区：</view>
			<input placeholder="请输入生产地区" v-model="product.origin"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">备注信息：</view>
			<input placeholder="请输入备注信息" v-model="product.remark"></input>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
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
				product: {
					image: null,
					name: 'iPhone 13 Pro',
					brand: 'Apple',
					specification: 'MLT83CH/A',
					barcode: '1111111111111',
					manufacturer: '富士康',
					origin: '中国',
					remark: 'iPhone',
					inventory: {
						warehouseInventory: 0,
						midwayInventory: 0,
						hubInventory: 0
					},
					customsInfo: {
						hsCode: '42022900',
					}
				}
			}
		},
		onLoad(option) {
			this.product = JSON.parse(decodeURIComponent(option.product));
		},
		methods: {
			getPhoto(val) {
				this.product.image = val
			},
			checkPrice: function(e) {
				//正则表达式
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input				
				this.$nextTick(() => {
					this.product.salePrice = e.target.value
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
			sub() {
				let productForm = this.product;
				productForm.warehouseInventory = this.product.inventory.warehouseInventory;
				productForm.midwayInventory = this.product.inventory.midwayInventory;
				productForm.hubInventory = this.product.inventory.hubInventory;
				let rules = [
					{name: 'image', required: true, type: 'required', errmsg: '请上传商品图片'},
					{name: 'name', required: true, type: 'required', errmsg: '请输入商品名称'},
					{name: 'brand', required: true, type: 'required', errmsg: '请输入商品品牌'},
					{name: 'specification', required: true, type: 'required', errmsg: '请输入商品型号'},
					{name: 'barcode', required: true, type: 'required', errmsg: '请输入商品条码'},
					// {name: 'salePrice', required: true, type: 'required', errmsg: '请输入销售价格'},
					// {name: 'warehouseInventory', required: true, type: 'required', errmsg: '请输入国外库存'},
					// {name: 'midwayInventory', required: true, type: 'required', errmsg: '请输入在途库存'},
					// {name: 'hubInventory', required: true, type: 'required', errmsg: '请输入国内库存'}
				]
				let valLoginRes = this.$validate.validate(productForm, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/product/update', this.product).then(res => {
						uni.navigateTo({
							url: './Product'
						})
					})
				}	
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.p_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	.p_title {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		/* add */
		flex: 0 0 325rpx;	
	}
</style>
