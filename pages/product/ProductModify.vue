<template>
	<view class="product">		
		<view class="detail">商品信息</view>
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
			<input placeholder="请扫描或点击获取随机条码" v-model="product.barcode"></input>
			<image src="../../imgs/random.png" style="width: 70rpx; height: 70rpx;" @click="getRandomScanCode"></image>
			<image src="../../imgs/scan.png" style="width: 60rpx; height: 60rpx;" @click="getScanCode"></image>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品图片：</view>
			<upimg @photo="getPhoto" :photo="product.image"></upimg>
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
		<view class="detail">库存信息</view>
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
		
		<view class="detail">海关信息</view>
		
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
			<view class="title">unit Price €：</view>
			<input type="digit" placeholder="请输入unit Price €" v-model="product.customsInfo.price" @input="checkPrice"></input>
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
			this.product.customsInfo.price = this.product.customsInfo.unitPrice / 100;
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
					this.product.customsInfo.price = e.target.value;
					this.product.customsInfo.unitPrice = this.product.customsInfo.price * 100;
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
			getRandomScanCode() {
				this.$api.http.get('/product/randomBarcode', null).then(res => {
					this.product.barcode = res
				})
			},
			sub(e) {
				if (e == 'delete') {
					this.$api.http.delete('/product/delete?id='+this.product.id, null).then(res => {
						uni.$emit('delete', this.product)
						uni.showToast({
							icon: 'success',
							title: '删除成功'
						})
					}, error => {
						uni.showToast({
							icon: 'none',
							title: '无法删除！'
						})
					})
					uni.navigateBack()
					return;
				}
				let productRule = [
					{name: 'image', type: 'required', errmsg: '请上传商品图片'},
					{name: 'name', type: 'required', errmsg: '请输入商品名称'},
					{name: 'brand', type: 'required', errmsg: '请输入商品品牌'},
					{name: 'specification', type: 'required', errmsg: '请输入商品型号'},
					{name: 'barcode', type: 'required', errmsg: '请输入商品条码'},
				]
				let inventoryRule = [
					{name: 'warehouseInventory', type: 'required', errmsg: '请输入国外库存'},
					{name: 'midwayInventory', type: 'required', errmsg: '请输入在途库存'},
					{name: 'hubInventory', type: 'required', errmsg: '请输入国内库存'}
				]
				let customsInfoRule = [
					{name: 'hsCode', type: 'required', errmsg: '请输入HS Code'},
					{name: 'materialBeschaffenheit', type: 'required', errmsg: '请输入Material Beschaffenheit'},
					{name: 'brandArticleNo', type: 'required', errmsg: '请输入Brand Article no.'},
					{name: 'brand', type: 'required', errmsg: '请输入Brand'},
					{name: 'articleName', type: 'required', errmsg: '请输入Article Name'},
					{name: 'price', type: 'required', errmsg: '请输入unit Price €'},
				]
				let productRes = this.$validate.validate(this.product, productRule)
				let inventoryRes = this.$validate.validate(this.product.inventory, inventoryRule)
				let customsInfoRes = this.$validate.validate(this.product.customsInfo, customsInfoRule)
				if (!productRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: productRes.errmsg
					})
				} else if (!inventoryRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: inventoryRes.errmsg
					})
				} else if (!customsInfoRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: customsInfoRes.errmsg
					})
				} else {
					this.$api.http.put('/product/update', this.product).then(res => {
						uni.$emit('modify', this.product)
						this.$api.msg.successToast('修改成功').then(res => {
							uni.navigateBack()
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
	.p_btn_group {
		background-color: #FFFFFF;
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
</style>
