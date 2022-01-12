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
			<view class="cu-form-title">生产地区：</view>
			<input v-model="item.product.origin" disabled></input>
		</view>
		<view class="cu-form-group" v-if="item.product.remark">
			<view class="cu-form-title">备注信息：</view>
			<input v-model="item.product.remark" disabled></input>
		</view>
		<view class="detail">物流信息</view>
		<view class="cu-form-group">
			<view class="cu-form-title">发货数量：{{item.deliveredQuantity}}</view>
		</view>
		<view class="detail">接收信息</view>
		<view class="cu-form-group">
			<view class="title">接收数量：</view>
			<input placeholder="请扫码确定接收数量" v-model="number" disabled></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="H70"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">确定接收</button>
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
					},
					deliveredQuantity: ''
				},
				number: '0'
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			sub() {
				let _this = this;
				uni.showModal({
					title: '确定接收数量',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					// content: _this.number,
					placeholderText: _this.number,
					success: function(res) {
						if (res.confirm) {
							_this.item.receivedQuantity = res.content==''?_this.number:res.content;;
							uni.$emit('edit', _this.item)
							uni.navigateBack()
						}
					}
				});
			},
			getScanCode() {
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						if (res.result == this.item.product.barcode) {
							uni.showToast({
								title: '扫描成功,商品为:'+this.item.product.name,
								icon: 'none'
							})
							this.number += 1;
						} else {
							uni.showToast({
								title: '可能不是该商品',
								icon: 'none'
							})
						}
					}
				})
			}
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
