<template>
	<view>
		<view class="detail">采购明细</view>
		<view class="cu-form-group" v-if="purchaseOrder.photo">
			<view class="title">采购照片：</view>
			<myimg :photo="purchaseOrder.photo" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.invoice">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<myimg :photo="purchaseOrder.invoice" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.invoiceDate">
			<view class="title">发票日期：{{purchaseOrder.invoiceDate}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.purchasePrice">
			<view class="title">采购单价￥：{{purchaseOrder.purchasePrice / 100}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.purchasedQuantity">
			<view class="title">已采购数量：{{purchaseOrder.purchasedQuantity}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">应采购数量：{{purchaseOrder.quantity}}</view>
		</view>
		<view class="detail" v-if="purchaseOrder.warehousedQuantity">接收明细</view>
		<view class="cu-form-group" v-if="purchaseOrder.warehousedQuantity">
			<view class="title">已接收数量：{{purchaseOrder.warehousedQuantity}}</view>
		</view>
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<view class="title">商品名称：{{purchaseOrder.product.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品品牌：{{purchaseOrder.product.brand}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品型号：{{purchaseOrder.product.specification}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品条码：{{purchaseOrder.product.barcode}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品图片：</view>
			<myimg :photo="purchaseOrder.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.manufacturer">
			<view class="title">生产厂家：{{purchaseOrder.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.origin">
			<view class="title">生产地区：{{purchaseOrder.product.origin}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.remark">
			<view class="title">备注信息：{{purchaseOrder.product.remark}}</view>
		</view>
		<view v-if="purchaseOrder.status!='CREATED'">
			<view class="detail">采购员信息</view>
			<view class="cu-form-group">
				<view class="title">采购员账号：{{purchaseOrder.buyer.username}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">采购员姓名：{{purchaseOrder.buyer.name}}</view>
			</view>
			<view class="cu-form-group" v-if="purchaseOrder.buyer.phoneNumber">
				<view class="title">采购员电话：</view>
				<input v-model="purchaseOrder.buyer.phoneNumber" disabled="true" style="color: #000000;"></input>
			</view>
		</view>
		<view v-if="purchaseOrder.status==='CONFIRMED' || purchaseOrder.status==='WAREHOUSED'">
			<view class="detail">仓管信息</view>
			<view class="cu-form-group">
				<view class="title">仓管账号：{{purchaseOrder.warehouseKeeper.username}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">仓管姓名：{{purchaseOrder.warehouseKeeper.name}}</view>
			</view>
			<view class="cu-form-group" v-if="purchaseOrder.warehouseKeeper.phoneNumber">
				<view class="title">仓管电话：</view>
				<input v-model="purchaseOrder.warehouseKeeper.phoneNumber" disabled="true" style="color: #000000;"></input>
			</view>
		</view>
		<view class="H50" v-if="purchaseOrder.status === 'PENDING' && role === 'ADMIN'"></view>
		<view class="p_btn_group" v-if="purchaseOrder.status === 'PENDING' && role === 'ADMIN'">
			<button class="p_btn cu-btn bg-red margin-tb-sm lg" @click="rejectPurchase">核验不通过</button>
			<button class="p_btn cu-btn bg-green margin-tb-sm lg" @click="warehouseKeeperAssign">分配仓管</button>
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/common/img-tool.js'
	export default {
		data() {
			return {
				purchaseOrder:  {"id":7,"createTime":"2021-12-27 00:29:08","updateTime":"2021-12-27 00:40:28","buyer":{"id":9,"createTime":"2021-12-27 00:37:19","updateTime":"2021-12-27 00:37:19","username":"15858780802","password":"$2a$10$Ro7YEGkUtXDS5AJdEkj1BeNSg0qSB.A6xbSLoe41sWSeSmvt85PAS","name":"采购","role":"BUYER","phoneNumber":null},"status":"READY","invoiceDate":null,"product":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","name":"清风牌面巾纸","barcode":"6922266446726","brand":"清风","specification":"150抽/包","inventory":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:58:03","warehouseInventory":3,"hubInventory":16,"midwayInventory":1},"manufacturer":null,"origin":"湖北省孝南市","remark":null,"customsInfo":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","hsCode":"42022900","materialBeschaffenheit":"This version is in a nano size in classic calfskin.Shoulder, crossbody, top handle or clutch carry. Detachable chain. shoulder strap. Zip closure with calfskin pull. Customisable with strap and personalised charms. Herringbone cotton canvas lining Embossed Anagram","brandArticleNo":"A510U98X01","brand":"LOEWE","articleName":"Nano Puzzle bag in classic calfskin"}},"purchasePrice":null,"quantity":2,"rejectReason":null,"warehouseKeeper":null} 
			};
		},
		onLoad(option) {
			this.role = uni.getStorageSync('user').role;
			this.purchaseOrder = JSON.parse(decodeURIComponent(option.purchaseOrder));
		},
		methods: {
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
								uni.$emit('edit');
								uni.navigateBack()
							})
						}
					}
				});
			},
			warehouseKeeperAssign() {
				uni.navigateTo({
					url: '../warehouse/WarehouseKeeperAssign?purchaseOrderId='+this.purchaseOrder.id
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}

</style>
