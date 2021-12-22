<template>
	<view class="content">
		<!-- <view class="search">
			<uni-easyinput suffixIcon="search" v-model="tabCurrentIndex" placeholder="请输入内容" @iconClick="search" color="#A5A5A5"></uni-easyinput>
		</view>	 -->
		<view class="navbar" v-if="orderList.length != 0">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
			{{item}}
			</view>
		</view>
		<empty v-if="orderList.length === 0"></empty>
		<view class="order-item" v-for="(item, index) in orderList" :key="index">
			<view @click="jumpOrderDetail(item)"> 
				<view class="i-top b-b">
					<text class="time">{{item.updateTime}}</text>
				</view>
				<scroll-view v-if="item.items.length > 1" class="goods-box-single" scroll-x>
					<view class="right" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
						<text class="price">{{goodsItem.salePrice * goodsItem.quantity}}</text>
					</view>
				</scroll-view>
				<view class="goods-box-single" v-if="item.items.length === 1" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
					<view class="right">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
						<text class="price">{{goodsItem.salePrice * goodsItem.quantity / 100}}</text>
					</view>
				</view>
					<view class="price-box">
					共
					<text class="num">{{item.items.length}}</text>
					类商品 <!-- 实付款
					<text class="price"> --></text>
				</view>
			</view>
			<view class="action-box b-t" v-if="item.state != 9">
				<button class="action-btn" @click="deleteOrder(item, index)">取消订单</button>
				<button class="action-btn recom" @click="jumpOrderModify(item)">修改订单</button>
			</view>
		</view>	
		<view class="H60"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpOrderAppend" class="cu-btn bg-red margin-tb-sm lg">新增订单</button>
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
				tabCurrentIndex: 0,
				navList: ['全部', '待发送', '已完成'],
				orderList: []
			};
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.$api.http.get('/saleOrder/findAll', this.request).then(res => {
					this.orderList = res.content
				})
			})
			this.$api.http.get('/saleOrder/findAll', this.request).then(res => {
				this.orderList = res.content
			})
		},
		methods: {
			jumpOrderDetail(order){
				uni.navigateTo({
					url: './OrderDetail?order='+encodeURIComponent(JSON.stringify(order))
				});
			},
			jumpOrderModify(order) {
				uni.navigateTo({
					url: './OrderModify?order='+encodeURIComponent(JSON.stringify(order))
				})
			},
			//删除订单
			deleteOrder(item, index) {
				// uni.showLoading({
				// 	title: '请稍后'
				// })
				// setTimeout(()=>{
				// 	this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
				// 	uni.hideLoading();
				// }, 600)
				this.$api.http.delete('/saleOrder/delete?id='+item.id, null).then(res => {
					this.orderList.splice(index, 1)
				})
			},
			//取消订单
			cancelOrder(item){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					let {stateTip, stateTipColor} = this.orderStateExp(9);
					item = Object.assign(item, {
						state: 9,
						stateTip, 
						stateTipColor
					})
					
					//取消订单后删除待付款中该项
					let list = this.navList[1].orderList;
					let index = list.findIndex(val=>val.id === item.id);
					index !== -1 && list.splice(index, 1);
					
					uni.hideLoading();
				}, 600)
			},
			distributeOrder(item) {
				uni.navigateTo({
					url: '/pages/user/buyer_assign/buyer_assign'
				});
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				if (state == 9) {
					stateTip = '订单已关闭';
					stateTipColor = '#909399';
				}
				return {stateTip, stateTipColor};
			},
			jumpOrderAppend() {
				uni.navigateTo({
					url: './OrderAppend'
				});
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
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
		// margin-top: 16upx;
		margin-bottom: 16upx;
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
			padding: 0upx 0;
			.right{
				flex: 1;
				padding: 0 30upx 0 0upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
					&:before{
						content: 'x';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
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
