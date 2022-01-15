<template>
	<view class="product">		
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品名称：{{item.product.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品品牌：{{item.product.brand}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品型号：{{item.product.specification}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品条码：{{item.product.barcode}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品图片：</view>
			<myimg :photo="item.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="item.product.manufacturer">
			<view class="cu-form-title">生产厂家：{{item.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.origin">
			<view class="cu-form-title">生产地区：{{item.product.origin}}</view>
		</view>
		<view class="cu-form-group" v-if="item.product.remark">
			<view class="cu-form-title">备注信息：{{item.product.remark}}</view>
		</view>
		<view class="cu-form-group">
			<view class="cu-form-title">商品库存：{{item.product.inventory.hubInventory}}</view>
		</view>
		<view class="detail">销售明细</view>
		<view class="cu-form-group">
			<view class="cu-form-title">销售数量：{{item.quantity}}</view>
		</view>
		<view v-if="item.deliveredQuantity != 0">
			<view class="detail">物流明细</view>
			<view class="cu-form-group">
				<view class="cu-form-title">已发数量：{{item.deliveredQuantity}}</view>
			</view>
			<view class="cu-form-group" v-for="express in item.expresses">
				<view class="cu-form-title">已发物流：</view>
				<input v-model="express.expressNumber" disabled="true" style="color: #000000;" @click="jumpLogistics(express.expressNumber)"></input>
			</view>	
		</view>
		<view class="detail">发货明细</view>
		<view v-if="!item.delivered">
			<view class="cu-form-group" >
				<text :style="{color:'red'}">*</text>
				<view class="title">物流单号：</view>
				<input placeholder="请扫描或输入物流单号" v-model="item.expressNumber"></input>
				<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
			</view>
			<view class="cu-form-group">
				<text :style="{color:'red'}">*</text>
				<view class="title">物流公司：</view>
				<input placeholder="请输入物流公司" v-model="item.expressCompany"></input>
			</view>
			<view class="cu-form-group">
				<text :style="{color:'red'}">*</text>
				<view class="title">发货数量：</view>
				<input placeholder="请输入发货数量" v-model="item.expressQuantity"></input>
			</view>
			<view>
				<view class="H50"></view>
				<view class="o_btn">
					<view class="flex flex-direction">
						<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">发送</button>
					</view>
				</view>
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
					expressNumber: ''
				},
				
			}
		},
		methods: {
			getScanCode() {
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						this.item.expressNumber = res.result
					}
				})
			},
			sub() {
				let rules = [
					{name: 'expressNumber', type: 'required', errmsg: '请输入物流单号'},
					{name: 'expressCompany', type: 'required', errmsg: '请输入物流公司'},
					{name: 'expressQuantity', type: 'required', errmsg: '请输入发货数量'},
				]
				let valLoginRes = this.$validate.validate(this.item, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/saleOrder/deliverItem?itemId='+this.item.id+'&quantity='+this.item.expressQuantity+'&expressCompany='+this.item.expressCompany+'&expressNumber='+this.item.expressNumber, null).then(res => {
						this.$api.msg.successToast('发送成功').then(res => {
							uni.$emit('edit', res)
							uni.navigateTo({
								url: './Transporter'
							})
						})
					})
				}
			},
			jumpLogistics(expressNumber) {
				uni.navigateTo({
					url: '../Logistics?expressNumber='+expressNumber
				})
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
		background: #FFFFFF;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
