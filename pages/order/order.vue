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
		<view class="order-item" v-for="(item, index) in orderList" :key="index" v-if="item.delivered == tabCurrentIndex - 1 || tabCurrentIndex === 0">
			<view @click="item.delivered?jumpOrderDetail(item):jumpOrderModify(item)"> 
				<view class="i-top b-b">
					<text class="time">{{item.updateTime}}</text>
					<text class="state" v-if="item.delivered">已完成</text>
				</view>
				<scroll-view v-if="item.items.length > 1" class="goods-box-single" scroll-x>
					<view class="right" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="price">{{goodsItem.salePrice / 100}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
					</view>
				</scroll-view>
				<view class="goods-box-single" v-if="item.items.length === 1" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
					<view class="right">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="price">{{goodsItem.salePrice / 100}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
					</view>
				</view>
				<view class="price-box">共<text class="num">{{item.items.length}}</text>类商品</text>
				</view>
			</view>
			<view class="action-box b-t" v-if="!item.delivered">
				<button class="action-btn" @click="deleteOrder(item, index)">取消订单</button>
				<button class="action-btn recom" @click="jumpOrderModify(item)">修改订单</button>
			</view>
		</view>	
		<view v-show="isLoadMore">
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpOrderAppend" class="cu-btn bg-red margin-tb-sm lg">添加订单</button>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				orderRequest: {
					page: 0,
					size: 5
				},
				noClick: true,
				tabCurrentIndex: 0,
				navList: ['全部', '待发送', '已完成'],
				orderList: [],
				isLoadMore: false,
				loadStatus: 'loading'
			};
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.orderList.some((order, i) => {
					if (order.id == e.id) {
						this.$set(this.orderList, i, e)  
					}
				})
			})
			this.getOrderList();
		},
		onUnload() {
			uni.$off('eidt');
		},
		onShow() {
			this.noClick = true;
		},
		methods: {
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
			async jumpOrderDetail(order){
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
						url: './OrderDetail?order='+encodeURIComponent(JSON.stringify(order))
					});
				}
			},
			async jumpOrderModify(order) {
				for (let i in order.items) {
					if (order.items[i].isItemUpdatable == null) {
						await this.$api.http.get('/saleOrder/isItemUpdatable?itemId='+order.items[i].id, null).then(res => {
							order.items[i].isItemUpdatable = res;
						})
					}
				}
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
						url: './OrderModify?order='+encodeURIComponent(JSON.stringify(order))
					})	
				}
			},
			//删除订单
			deleteOrder(item, index) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					this.$api.http.delete('/saleOrder/delete?id='+item.id, null).then(res => {
						this.orderList.splice(index, 1)
						uni.hideLoading();
					}).catch(err => {
						this.$api.msg.toast("销售单中存在无法删除的销售单项目！");
					})
				}, 600)
			},
			jumpOrderAppend() {
				uni.navigateTo({
					url: './OrderAppend'
				});
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
		},
		onReachBottom() {
			if (!this.isLoadMore) { 
				this.isLoadMore = true;
				this.orderRequest.page += 1;
				this.getOrderList();
			}
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: #FFFFFF;
		// background: $page-color-base;
		height: 100%;
	}
	.search {
		background: #FFFFFF;
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
	}
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 38upx;
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
		border-bottom: 1px solid #EAEAEA;
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
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
	.p_btn {
		background: #FFFFFF;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
