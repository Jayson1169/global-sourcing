<template>
	<view class="content">
		<view class="navbar">
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
		<view 
			v-for="(item, index) in orderList" :key="index" v-if="item.delivered == tabCurrentIndex - 1 || tabCurrentIndex === 0"
			class="order-item"
		>
			<view @click="jumpOrderTransport(item)"> 
				<view class="i-top b-b">
					<text class="time">{{item.updateTime}}</text>
				</view>
				<scroll-view v-if="item.items.length > 1" class="goods-box-single" scroll-x>
					<view 
						v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex"
						class="right"
					>
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
						<text class="price">{{goodsItem.salePrice * goodsItem.quantity / 100}}</text>
					</view>
				</scroll-view>
				<view 
					v-if="item.items.length === 1"
					class="goods-box-single"
					v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex"
				>
					<view class="right">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
						<text class="price">{{goodsItem.salePrice * goodsItem.quantity / 100}}</text>
					</view>
				</view>
					<view class="price-box">
					共
					<text class="num">{{item.items.length}}</text>
					类商品</text>
				</view>
			</view>
			<view class="action-box b-t" v-if="!item.delivered">
				<button class="action-btn recom" @click="send(item)">发送快递</button>
			</view>
		</view>	
		<view v-show="isLoadMore" v-if="orderList.length != 0">
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
		<u-tabbar
			:value="value"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="订单管理" icon="order" @click="click" ></u-tabbar-item>
			<u-tabbar-item text="转运物流" icon="car" @click="click" ></u-tabbar-item>
		</u-tabbar>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				value: 0,
				orderRequest: {
					page: 0,
					size: 10
				},
				tabCurrentIndex: 0,
				orderList: [],
				status_to_state: {"CREATED": 1, "READY": 2, "PENDING": 3, "REJECTED": 2, "CONFIRMED": 4, "WAREHOUSED": 5},
				status_to_state2: {"CREATED": "待分配", "READY": "待采购", "PENDING": "待核验", "REJECTED": "待采购", "CONFIRMED": "待接收", "WAREHOUSED": "已完成"},
				navList: ['全部', '待发送', '已完成'],
				isLoadMore: false,
				loadStatus: 'loading'
			};
		},
		onBackPress(options) {
		    return true;
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.init();
			})
			this.getOrderList();
		},
		onUnload() {
			uni.$off('edit');
		},
		onShow() {
			this.noClick = true;
		},
		methods: {
			init() {
				this.orderRequest.page = 0;
				this.orderRequest.size = 10;
				this.orderList = [];
				this.getOrderList();
			},
			getOrderList() {
				this.$api.http.get('/saleOrder/findAll', this.orderRequest).then(res => {
					this.orderList = this.orderList.concat(res.content);
					if (res.numberOfElements < this.orderRequest.size) {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					} else {
						this.isLoadMore = false
					}
				}).catch(err => {
					this.isLoadMore = true
					if (this.orderRequest.page > 1) this.orderRequest.page -= 1
				})	
			},
			click(e) {
				if (e == 0) {
					uni.navigateTo({
						url: './WarehouseKeeper'
					})
				} else if (e == 1) {
					uni.navigateTo({
						url: './ExpressOrder'
					})
				} else {
					uni.redirectTo({
						url: './WarehouseOutput?purchaseOrderList='+encodeURIComponent(JSON.stringify(this.purchaseOrderList))
					})
				}
			},
			async jumpOrderTransport(order){
				for (let i in order.items) {
					if (order.items[i].product.image == null) {
						await this.$api.http.get('/product/getImage?id='+order.items[i].product.id, null).then(res => {
							order.items[i].product.image = res
						})
					}
				}
				if (this.noClick) {
					this.noClick = false;
					uni.navigateTo({
						url: './OrderTransport?order='+encodeURIComponent(JSON.stringify(order))
					});
				}
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			send(item) {
				let _this = this;
				uni.showModal({
					title: '发送快递',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					placeholderText: "请输入物流单号",
					success: function(res) {
						if (res.confirm) {
							_this.$api.http.put('/saleOrder/deliver?id='
									+item.id+'&expressNumber='+res.content, null).then(res => {
								// item.delivered = true;
								this.$api.msg.successToast('发送成功').then(res => {
									uni.reLaunch()
								})
							})
						}
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: #FFFFFF;
		height: 100%;
	}
	.search {
		background: #FFFFFF;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
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
			font-size: 30upx;
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
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		border-bottom: 1px solid #EAEAEA;
		// margin-top: 16upx;
		// margin-bottom: 16upx;
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
</style>