<template>
	<!-- 驳回理由 -->
	<view class="product">
		<view class="order">采购明细</view>
		<view class="cu-form-group">
			<view class="title">采购照片：</view>
			<upimg @photo="getPhoto" :photo="purchaseOrder.photo"></upimg>
		</view>
		<view class="cu-form-group">
			<view class="title">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票：</view>
			<upimg @photo="getInvoice" :photo="purchaseOrder.invoice"></upimg>
		</view>
		<view class="cu-form-group">
			<view class="title">发票日期：</view>
			<picker mode="date" :value="purchaseOrder.invoiceDate" @change="bindDateChange">
				<view class="title">{{purchaseOrder.invoiceDate==null?"请选择发票日期":purchaseOrder.invoiceDate}}</view>
			</picker>
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
			<input placeholder="请输入采购单价" v-model="purchaseOrder.purchasePrice" @input="checkPrice"></input>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">上传信息</button>
			</view>
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
			// uni.$on('item', (e) => {
			// 	this.saleOrder.items = this.saleOrder.items.concat(e)
			// })
		},
		methods: {
			getPhoto(val) {
				this.purchaseOrder.photo = val
			},
			getInvoice(val) {
				this.purchaseOrder.invoice = val
			},
			checkPrice: function(e) {
				//正则表达式
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input				
				this.$nextTick(() => {
					this.purchaseOrder.purchasePrice = e.target.value
				})
			},
			sub() { 			
				this.$api.http.put('/purchaseOrder/uploadPurchaseInfo', this.purchaseOrder).then(res => {
					uni.showToast({
						title: '添加成功',
						icon: 'none'
					})
					uni.navigateTo({
						url: './Purchaser'
					});
				})
			},
			bindDateChange: function(e) {
				this.purchaseOrder.invoiceDate = e.target.value
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.order {
		padding: 10px 10px 10px 10px;
	}
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	.p_image {
		width: 162rpx;
		height: 162rpx;
		padding: 10rpx;
	}
	// 去掉 picker 右边的箭头
	.cu-form-group picker::after {  
	    display: none;  
	}  
	.goods_add {
		font-size: 13px;
		justify-content: center;
		align-items: center;
	}
	.tag-e {
		background-color:#fff;
		margin-bottom: 0px;
		font-size: 13px;
		.goods {
			display: flex;
			width: 100%;
			background-color: #ffffff;
			padding: 10px;
			box-sizing: border-box;
			border-bottom: 1px solid #EEF0EF;
			.goods_02 {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				height: 160rpx;
				flex-grow: 1;
				justify-content: space-between;
				padding-top: 10rpx;
				padding-left: 25rpx;
			}
			.goods_title {
				max-height: 40px;
				overflow: hidden;
				line-height: 20px;
				font-weight: 600;
			}
			.goods_des {
				color: #979797;
			}
			.good_p { 
				display: flex;
				justify-content: space-between;
				.good_price {
					color: #F04E42;
					font-weight: 600;
				}
			}
		}
	}
</style>
