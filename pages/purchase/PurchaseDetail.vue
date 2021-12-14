<template>
	<!-- 驳回理由 -->
	<view class="product">
		<view class="order">采购明细</view>
		<view class="cu-form-group">
			<view class="title">采购照片：</view>
			<image class="image" :src="purchaseOrder.photo" mode="aspectFill" @click="previewImage(purchaseOrder.photo)" v-if="purchaseOrder.invoice != null"></image>
			<image class="image" src="@/imgs/order2.jpg" mode="aspectFill" @click="previewImage(purchaseOrder.invoice)" v-if="purchaseOrder.invoice == null"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<image class="image" :src="purchaseOrder.invoice" mode="aspectFill" @click="previewImage(purchaseOrder.invoice)" v-if="purchaseOrder.invoice != null"></image>
			<image class="image" src="@/imgs/order2.jpg" mode="aspectFill" @click="previewImage(purchaseOrder.invoice)" v-if="purchaseOrder.invoice == null"></image>		
		</view>
		<view class="cu-form-group">
			<view class="title">发票日期：</view>
			<input placeholder="待采购输入发票日期" v-model="purchaseOrder.invoiceDate" disabled></input>
		</view>
		<view class="order">商品信息</view>
		<view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input v-model="purchaseOrder.product.name" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：</view>
			<input v-model="purchaseOrder.product.specification" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">采购数量：</view>
			<input placeholder="请输入采购数量" v-model="purchaseOrder.quantity" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">采购单价：</view>
			<input placeholder="待采购输入采购单价" v-model="purchaseOrder.purchasePrice" disabled></input>
		</view>
		
	</view>
</template>

<script>
	import upimg from '@/components/sunui-upimg/sunui-upimg.vue'
	export default {
		components: {
			upimg
		},
		data() {
			return {
				purchaseOrder: {},
				date: '请选择日期',
			};
		},
		onLoad(option) {
			this.purchaseOrder = JSON.parse(decodeURIComponent(option.purchaseOrder));
		},
		methods: {
			previewImage(image) {
				let preview = [];
				preview.push(image)
				uni.previewImage({
					current: 0,
					urls: preview
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.order {
		padding: 10px;
	}
	.image {
		width: 162rpx;
		height: 162rpx;
		padding: 10rpx;
	}
</style>
