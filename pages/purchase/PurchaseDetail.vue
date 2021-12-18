<template>
	<view>
		<view class="p_order">采购明细</view>
		<view class="cu-form-group">
			<view class="title">采购照片：</view>
			<image class="p_image" :src="purchaseOrder.photo" mode="aspectFill" @click="previewImage(purchaseOrder.photo)" v-if="purchaseOrder.invoice != null"></image>
			<image class="p_image" src="@/imgs/order2.jpg" mode="aspectFill" v-if="purchaseOrder.invoice == null"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<image class="p_image" :src="purchaseOrder.invoice" mode="aspectFill" @click="previewImage(purchaseOrder.invoice)" v-if="purchaseOrder.invoice != null"></image>
			<image class="p_image" src="@/imgs/order2.jpg" mode="aspectFill" v-if="purchaseOrder.invoice == null"></image>		
		</view>
		<view class="cu-form-group">
			<view class="title">发票日期：</view>
			<input placeholder="待采购输入发票日期" v-model="purchaseOrder.invoiceDate" disabled></input>
		</view>
		<view class="p_order">商品信息</view>
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
			<view class="title">商品条码：</view>
			<input placeholder="待采购输入条形码" v-model="purchaseOrder.product.barcode"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">采购单价：</view>
			<input placeholder="待采购输入采购单价" v-model="purchaseOrder.purchasePrice" disabled></input>
		</view>
		<view class="H50"></view>
		<view class="p_btn_group" v-if="purchaseOrder.status === 'PENDING' && role === 'ADMIN'">
			<button class="p_btn cu-btn bg-red margin-tb-sm lg" @click="rejectPurchase">核验不通过</button>
			<button class="p_btn cu-btn bg-green margin-tb-sm lg" @click="warehouseAssign">分配仓管</button>
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
				purchaseOrder: {"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null},
				date: '请选择日期'
			};
		},
		onLoad(option) {
			this.role = uni.getStorageSync('user').role
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
			},
			rejectPurchase() {
				let _this = this;
				uni.showModal({
					title: '采购核验',
					cancelText: "取消",  
					confirmText: "确定",
					confirmColor:'#F54E40',
					editable: true,
					placeholderText: "请输入拒绝理由",
					success: function(res) {
						if (res.confirm) {
							_this.$api.http.put('/purchaseOrder/reject?id='+_this.purchaseOrder.id+'&rejectReason='+res.content, null).then(res => {
								uni.navigateTo({
									url: './Purchase'
								})
							})
						}
					}
				});
			},
			warehouseAssign() {
				uni.navigateTo({
					url: '../warehouse/WarehouseAssign'
				})
				// let _this = this;
				// uni.showModal({
				// 	content: "核验通过",
				// 	cancelText: "取消",  
				// 	confirmText: "确认",
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			_this.$api.http.put('/purchaseOrder/confirm?id='+_this.purchaseOrder.id, null).then(res => {
				// 				uni.navigateTo({
				// 					url: './Purchase'
				// 				})
				// 			})
				// 		}
				// 	}
				// });
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.p_order {
		padding: 10px;
	}

	.p_image {
		width: 162rpx;
		height: 162rpx;
		padding: 10rpx 10rpx 10rpx 0rpx;
	}

	.p_btn_group {
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
