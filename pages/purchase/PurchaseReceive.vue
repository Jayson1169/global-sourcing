<template>
	<view>
		<view class="p_order">采购明细</view>
		<view class="cu-form-group">
			<view class="title">采购照片：</view>
			<image class="p_image" :src="purchaseOrder.photo" mode="aspectFill" @click="previewImage(purchaseOrder.photo)"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<image class="p_image" :src="purchaseOrder.invoice" mode="aspectFill" @click="previewImage(purchaseOrder.invoice)"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">发票日期：</view>
			<input v-model="purchaseOrder.invoiceDate" disabled></input>
		</view>
		<view class="p_order">商品信息</view>
		<view class="cu-form-group">
			<view class="title">商品图片：</view>
			<image class="p_image" :src="purchaseOrder.product.photo" mode="aspectFill" @click="previewImage(purchaseOrder.product.photo)"></image>
		</view>
		<view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input v-model="purchaseOrder.product.name" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品品牌：</view>
			<input v-model="purchaseOrder.product.brand" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：</view>
			<input v-model="purchaseOrder.product.specification" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品条码：</view>
			<input v-model="purchaseOrder.product.barcode" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产厂家：</view>
			<input placeholder="未输入生产厂家" v-model="purchaseOrder.product.manufacturer" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">生产地区：</view>
			<input placeholder="未输入生产地区" v-model="purchaseOrder.product.origin" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">备注信息：</view>
			<input placeholder="未输入备注信息" v-model="purchaseOrder.product.remark" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">采购数量：</view>
			<input v-model="purchaseOrder.quantity" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">采购单价：</view>
			<input v-model="purchaseOrder.purchasePrice" disabled></input>
		</view>
		<view class="p_order">接收信息</view>
		<view class="cu-form-group">
			<view class="title">接收数量：</view>
			<input placeholder="请扫码确定接收数量" v-model="number" disabled></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="H50"></view>
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
				purchaseOrder: {"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null, "warehouseKeeper": {"name": "yinxin", "phoneNumber": "18390818785"}},
				number: 0
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
			},
			sub() {
				let _this = this;
				uni.showModal({
					title: '请确定接收数量',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					content: _this.number,
					success: function(res) {
						if (res.confirm) {
							_this.$api.http.put('/purchaseOrder/putIntoWarehouse?id='+_this.purchaseOrder.id+'&quantity='+res.content, null).then(res => {
								uni.navigateTo({
									url: '../warehouse/WarehouseKeeper'
								})
							})
						}
					}
				});
			},
			getScanCode() {
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						if (res.result == this.purchaseOrder.product.barcode) {
							uni.showToast({
								title: '扫描成功,商品为:'+this.purchaseOrder.product.name,
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
	.p_order {
		padding: 10px;
	}
	.p_image {
		width: 162rpx;
		height: 162rpx;
		padding: 10rpx 10rpx 10rpx 0rpx;
	}
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
