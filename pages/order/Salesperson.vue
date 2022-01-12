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
					</view>
				</scroll-view>
				<view class="goods-box-single" v-if="item.items.length === 1" v-for="(goodsItem, goodsIndex) in item.items" :key="goodsIndex">
					<view class="right">
						<text class="title">{{goodsItem.product.name}}</text>
						<text class="price">{{goodsItem.salePrice / 100}}</text>
						<text class="attr-box">{{goodsItem.quantity}}</text>
					</view>
				</view>
					<view class="price-box">
					共
					<text class="num">{{item.items.length}}</text>
					类商品 <!-- 实付款
					<text class="price"> --></text>
				</view>
			</view>
			<view class="action-box b-t" v-if="!item.delivered">
				<button class="action-btn" @click="deleteOrder(item, index)">取消订单</button>
				<button class="action-btn recom" @click="jumpOrderModify(item)">修改订单</button>
			</view>
		</view>	
		<view v-show="isLoadMore" v-if="orderList.length != 0">
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
					size: 10
				},
				tabCurrentIndex: 0,
				navList: ['全部', '待发送', '已完成'],
				orderList: [],
				isLoadMore: false,
				loadStatus: 'loading'
				// orderList: [{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","salesperson":{"id":1,"createTime":"2021-12-23 01:09:54","updateTime":"2021-12-23 01:10:01","username":"admin","password":"$2a$10$P8UFgtFSeCz.57PbNf2sRuOz2qg8JFJx9.wfJdNsX/7BuNzGvWeg2","name":"admin","role":"ADMIN","phoneNumber":null},"address":{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","name":"殷鑫","idNumber":"467489199910247815","phoneNumber":"15858780802","shipAddress":"湖南省长沙市天心区中南大学铁道学院"},"items":[{"id":1,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","product":{"id":1,"createTime":"2021-12-26 21:54:39","updateTime":"2021-12-26 23:18:43","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":"6917246004355","brand":"曼秀雷敦","specification":"150ml","inventory":{"id":1,"createTime":"2021-12-26 21:54:38","updateTime":"2021-12-26 23:18:43","warehouseInventory":2,"hubInventory":10,"midwayInventory":8},"manufacturer":null,"origin":"广东省中山市","remark":null,"customsInfo":{"id":1,"createTime":"2021-12-26 21:54:38","updateTime":"2021-12-26 23:18:43","hsCode":"42022900","materialBeschaffenheit":"This version is in a nano size in classic calfskin.Shoulder, crossbody, top handle or clutch carry. Detachable chain. shoulder strap. Zip closure with calfskin pull. Customisable with strap and personalised charms. Herringbone cotton canvas lining Embossed Anagram","brandArticleNo":"A510U98X01","brand":"LOEWE","articleName":"Nano Puzzle bag in classic calfskin"}},"salePrice":2500,"quantity":4},{"id":2,"createTime":"2021-12-26 21:54:49","updateTime":"2021-12-26 21:54:49","product":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","name":"清风牌面巾纸","barcode":"6922266446726","brand":"清风","specification":"150抽/包","inventory":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","warehouseInventory":0,"hubInventory":10,"midwayInventory":7},"manufacturer":null,"origin":"湖北省孝南市","remark":null,"customsInfo":{"id":2,"createTime":"2021-12-26 21:54:42","updateTime":"2021-12-26 23:04:44","hsCode":"42022900","materialBeschaffenheit":"This version is in a nano size in classic calfskin.Shoulder, crossbody, top handle or clutch carry. Detachable chain. shoulder strap. Zip closure with calfskin pull. Customisable with strap and personalised charms. Herringbone cotton canvas lining Embossed Anagram","brandArticleNo":"A510U98X01","brand":"LOEWE","articleName":"Nano Puzzle bag in classic calfskin"}},"salePrice":400,"quantity":7}]}]
			};
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.init();
			})
			this.orderRequest.salespersonId = uni.getStorageSync('user').id;
			this.getOrderList();
		},
		onUnload() {
			uni.$off('edit');
		},
		onShow() {
			this.noClick = true;
			// this.init();
		},
		methods: {
			init() {
				this.orderRequest.page = 0;
				this.orderRequest.size = 10;
				this.orderList = [];
				this.getOrderList();
			},
			getOrderList() {
				this.$api.http.get('/saleOrder/findAllBySalesperson', this.orderRequest).then(res => {
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
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
		},
		onReachBottom() {
			// 此处判断，上锁，防止重复请求
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
	.p_btn {
		background: #FFFFFF;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
</style>
