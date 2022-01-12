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
		<view class="cu-form-group">
			<view class="cu-form-title">商品库存：{{item.product.inventory.warehouseInventory}}</view>
		</view>
		<view class="detail">物流信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">发货数量：</view>
			<input type="number" placeholder="请输入发货数量" v-model="item.deliveredQuantity"></input>
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
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			sub: function(e) {
				if (this.item.deliveredQuantity > this.item.product.inventory.warehouseInventory && e == 'modify') {
					this.$api.msg.toast('库存不足')
				} else {
					let rules = [
						{name: 'deliveredQuantity', required: true, type: 'required', errmsg: '请输入发货数量'}
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
	.cu-form-group .title {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		/* add */
		flex: 0 0 160rpx;
	}
</style>
