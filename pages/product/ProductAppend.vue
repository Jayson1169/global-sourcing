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
				product: {"image":"data:image/png;base64,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","name":"iPhone 13 Pro","brand":"Apple","specification":"MLT83CH/A","barcode":"1111111111111","manufacturer":"富士康","origin":"中国","remark":"iPhone","inventory":{"warehouseInventory":"0","midwayInventory":"0","hubInventory":"0"},"customsInfo":{"hsCode":"42022900","materialBeschaffenheit":"123","brandArticleNo":"123","brand":"123","articleName":"123","price":"100","unitPrice":"1"}}
			}
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
						_this.product.barcode = res.result
					}
				})
			},
			getRandomScanCode() {
				this.$api.http.get('/product/randomBarcode', null).then(res => {
					this.product.barcode = res
				})
			},
			sub() {
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
					this.$api.http.post('/product/insert', this.product).then(res => {
						this.$api.msg.successToast('添加成功').then(res => {
							uni.navigateBack()
						})
					}, error => {
						uni.showToast({
							icon: 'none',
							title: error
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
</style>
