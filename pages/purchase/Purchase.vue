<template>
	<!-- 显示采购员信息，按住复制号码 -->
	<view class="content">
		<view class="navbar" v-if="purchaseOrder.length != 0">
			<view 
				class="nav-item"
				:class="{current: tabCurrentIndex === index}"
				v-for="(item, index) in navList" :key="index" 
				@click="tabClick(index)"
			>
				{{item}}
			</view>
		</view>
		<empty v-if="purchaseOrder.length === 0"></empty>
		<view 
			v-for="(item, index) in purchaseOrder" :key="index" v-if="status_to_state[item.status] === tabCurrentIndex || tabCurrentIndex === 0"
			class="order-item"
		>
			<view class="i-top b-b">
				<text class="time">{{item.updateTime}}</text>
				<text class="state" style="color: '#fa436a'">{{status_to_state2[item.status]}}</text>
				<text v-if="item.status==='REJECTED'" class="del-btn yticon icon-iconfontshanchu1"></text>
				<text v-if="item.status==='REJECTED'" class="state" style="color: '#909399'">核验未通过</text>
			</view>
			<view class="goods-box-single" @click="jumpPurchaseDetail(item)">
				<image class="goods-img" :src="item.photo" mode="aspectFill" v-if="item.photo != null"></image>
				<image class="goods-img" src='@/imgs/order2.jpg' mode="aspectFill" v-if="item.photo === null"></image>	
				<view class="right">
					<text class="title clamp">{{item.product.name}}</text>
					<text class="attr-box">{{item.product.specification}} x {{item.quantity}}</text>
					<text class="price" v-if="status_to_state[item.status] != 1 && status_to_state[item.status] != 2">{{item.purchasePrice / 100}}</text>
				</view>
			</view>
			<view class="price-box" v-if="status_to_state[item.status] != 1 && status_to_state[item.status] != 2">
				共
				<text class="num">{{item.quantity}}</text>
				件商品 实付款
				<text class="price">{{item.quantity * item.purchasePrice / 100}}</text>
			</view>
			<text v-if="item.status==='REJECTED'" style="font-size: 12px;">拒绝理由：{{item.rejectReason}}</text>
			<view class="action-box b-t" v-if="status_to_state[item.status] != 4 && status_to_state[item.status] != 5">
				<button class="action-btn recom" v-if="status_to_state[item.status] == 1" @click="purchaserAssign(item)">立即分配</button>
				<button class="action-btn recom" v-if="status_to_state[item.status] == 3" @click="jumpPurchaseDetail(item)">立即核验</button>							
			</view>
		</view>
		<view class="H60"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpPurchaseAppend" class="cu-btn bg-red margin-tb-sm lg">新增采购单</button>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				request: {
					page: '0',
					size: '999'
				},
				purchaseOrder: [],
				tabCurrentIndex: 0,
				status_to_state: {"CREATED": 1, "READY": 2, "PENDING": 3, "REJECTED": 2, "CONFIRMED": 4, "WAREHOUSED": 5},
				status_to_state2: {"CREATED": "待分配", "READY": "待采购", "PENDING": "待核验", "REJECTED": "待采购", "CONFIRMED": "待接收", "WAREHOUSED": "已完成"},
				navList: ['全部', '待分配', '待采购', '待核验', '待接收', '已完成']
			};
		},
		onLoad(){
			this.$api.http.get('/purchaseOrder/findAll', this.request).then(res => {
				this.purchaseOrder = res.content
			})
		},
		 
		methods: {
			jumpPurchaseDetail(purchaseOrder){
				this.$api.http.get('/product/getImage?id='+purchaseOrder.product.id, null).then(res => {
					purchaseOrder.product.image = res;
					// this.$api.http.get('/purchaseOrder/getPhoto?id='+purchaseOrder.id, null).then(res => {
					// 	purchaseOrder.photo = res;
					// 	this.$api.http.get('/purchaseOrder/getInvoice?id='+purchaseOrder.id, null).then(res => {
					// 		purchaseOrder.invoice = res;
							uni.navigateTo({
								url: './PurchaseDetail?purchaseOrder='+encodeURIComponent(JSON.stringify(purchaseOrder))
							});
					// 	})
					// })
				})
			},
			jumpPurchaseAppend() {
				uni.navigateTo({
					url: './PurchaseAppend',
				});
			},
			purchaserAssign(item) {
				uni.navigateTo({
					url: './PurchaserAssign?purchaseOrderId='+item.id+'&quantity='+item.quantity
				});
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				console.log(index)
			},
			purchaseNumberEdit(item, index) {
				let _this = this;
				uni.showModal({
					title: '修改采购数量',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					placeholderText: "请输入采购数量",
					success: function(res) {
						if (res.confirm) {
							_this.$api.http.put('/purchaseOrder/reject?id='+_this.purchaseOrder.id+'&rejectReason='+res.content, null).then(res => {
								uni.navigateTo({
									url: './Purchase'
								})
							})
							console.log("修改采购数量为:", res.content)
						}
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.search {
		background: #FFFFFF;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
	}
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 135upx;
				height: 135upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
					padding: 0upx 6upx;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 6upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 5upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	.p_btn {
		background: #FFFFFF;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
