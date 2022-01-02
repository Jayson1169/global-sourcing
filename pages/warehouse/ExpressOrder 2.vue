<template>
	<view class="content">
		<!-- <view class="search">
			<uni-easyinput suffixIcon="search" v-model="tabCurrentIndex" placeholder="请输入内容" @iconClick="search" color="#A5A5A5"></uni-easyinput>
		</view>	 -->
		<view class="navbar" v-if="expressOrderList.length != 0">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
			{{item}}
			</view>
		</view>
		<empty v-if="expressOrderList.length === 0"></empty>
		<view class="order-item" v-for="(item, index) in expressOrderList" :key="index" v-if="status_to_state[item.status] === tabCurrentIndex || tabCurrentIndex === 0">
			<view @click="jumpExpressOrderDetail(item)"> 
				<view class="i-top b-b">
					<text class="time">{{item.updateTime}}</text>
					<text class="state" style="color: '#fa436a'">{{status_to_state2[item.status]}}</text>
				</view>
				<scroll-view v-if="item.items.length > 1" class="goods-box-single" scroll-x>
					<view class="right" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.deliveredQuantity}}</text>
					</view>
				</scroll-view>
				<view class="goods-box-single" v-if="item.items.length === 1" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
					<view class="right">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.deliveredQuantity}}</text>
					</view>
				</view>
				<view class="price-box">
					共
					<text class="num">{{item.items.length}}</text>
					类商品</text>
				</view>
			</view>
			<!-- <view class="action-box b-t" v-if="item.state != 9">
				<button class="action-btn" @click="deleteOrder(item, index)">取消订单</button>
				<button class="action-btn recom" @click="jumpOrderModify(item)">修改订单</button>
			</view> -->
		</view>	
		<view class="H60"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpExpressOrderAppend" class="cu-btn bg-red margin-tb-sm lg">添加物流单</button>
			</view>
		</view>
		<u-tabbar
			:value="value"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="采购管理" icon="shopping-cart" @click="click" ></u-tabbar-item>
			<u-tabbar-item text="快递物流" icon="car" @click="click" ></u-tabbar-item>
			<u-tabbar-item text="导出海关信息" icon="reload" @click="click" ></u-tabbar-item>
		</u-tabbar>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				value: 1,
				request: {
					page: '0',
					size: '999'
				},
				tabCurrentIndex: 0,
				navList: ['全部', '已发货', '已收货'],
				status_to_state: {"DELIVERED": 1, "RECEIVED": 2},
				status_to_state2: {"DELIVERED": "已发货", "RECEIVED": "已收货"},
				expressOrderList: []
				// orderList: [{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","salesperson":{"id":1,"createTime":"2021-12-23 01:09:54","updateTime":"2021-12-23 01:10:01","username":"admin","password":"$2a$10$P8UFgtFSeCz.57PbNf2sRuOz2qg8JFJx9.wfJdNsX/7BuNzGvWeg2","name":"admin","role":"ADMIN","phoneNumber":null},"address":{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","name":"殷鑫","idNumber":"467489199910247815","phoneNumber":"15858780802","shipAddress":"湖南省长沙市天心区中南大学铁道学院"},"items":[{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","product":{"id":1,"createTime":"2021-12-26 21:54:39","updateTime":"2021-12-26 23:18:43","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":"6917246004355","brand":"曼秀雷敦","specification":"150ml","inventory":{"id":1,"createTime":"2021-12-26 21:54:38","updateTime":"2021-12-26 23:18:43","warehouseInventory":2,"hubInventory":10,"midwayInventory":8},"manufacturer":null,"origin":"广东省中山市","remark":null,"customsInfo":{"id":1,"createTime":"2021-12-26 21:54:38","updateTime":"2021-12-26 23:18:43","hsCode":"42022900","materialBeschaffenheit":"This version is in a nano size in classic calfskin.Shoulder, crossbody, top handle or clutch carry. Detachable chain. shoulder strap. Zip closure with calfskin pull. Customisable with strap and personalised charms. Herringbone cotton canvas lining Embossed Anagram","brandArticleNo":"A510U98X01","brand":"LOEWE","articleName":"Nano Puzzle bag in classic calfskin"}},"salePrice":2500,"quantity":4},{"id":2,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","product":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","name":"清风牌面巾纸","barcode":"6922266446726","brand":"清风","specification":"150抽/包","inventory":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","warehouseInventory":0,"hubInventory":10,"midwayInventory":7},"manufacturer":null,"origin":"湖北省孝南市","remark":null,"customsInfo":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","hsCode":"42022900","materialBeschaffenheit":"This version is in a nano size in classic calfskin.Shoulder, crossbody, top handle or clutch carry. Detachable chain. shoulder strap. Zip closure with calfskin pull. Customisable with strap and personalised charms. Herringbone cotton canvas lining Embossed Anagram","brandArticleNo":"A510U98X01","brand":"LOEWE","articleName":"Nano Puzzle bag in classic calfskin"}},"salePrice":400,"quantity":7}]}]
			};
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.expressOrderList.some((order, i) => {
					if (order.id == e.id) {
						this.$set(this.orderList, i, e)  
					}
				})
			})
			this.$api.http.get('/expressOrder/findAll', this.request).then(res => {
				this.expressOrderList = res.content
			})
		},
		onUnload() {
			uni.$off('eidt');
		},
		methods: {
			click(e) {
				if (e == 0) {
					uni.redirectTo({
						url: './WarehouseKeeper'
					})
				} else if (e == 1) {
					uni.redirectTo({
						url: './ExpressOrder'
					})
				} else {
					uni.redirectTo({
						url: './WarehouseOutput?purchaseOrderList='+encodeURIComponent(JSON.stringify(this.purchaseOrderList))
					})
				}
			},
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			jumpExpressOrderDetail(expressOrder){
				for (let i in expressOrder.items) {
				    this.$api.http.get('/product/getImage?id='+expressOrder.items[i].product.id, null).then(res => {
						expressOrder.items[i].product.image = res
						// 加载完图片再跳转
						if (i == expressOrder.items.length - 1) {
							uni.navigateTo({
								url: './ExpressOrderDetail?expressOrder='+encodeURIComponent(JSON.stringify(expressOrder))
							});
						}
					})
				}
			},
			jumpOrderModify(order) {
				for (let i in order.items) {
				    this.$api.http.get('/product/getImage?id='+order.items[i].product.id, null).then(res => {
						order.items[i].product.image = res
						// 加载完图片再跳转
						if (i == order.items.length - 1) {
							uni.navigateTo({
								url: './OrderModify?order='+encodeURIComponent(JSON.stringify(order))
							})	
						}
					})
				}
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
			jumpExpressOrderAppend() {
				uni.navigateTo({
					url: './ExpressOrderAppend'
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
		background: $page-color-base;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 100upx;
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
