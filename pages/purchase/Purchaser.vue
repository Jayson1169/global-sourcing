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
		<empty v-if="purchaseOrderList.length === 0"></empty>
		<view 
			v-for="(item, index) in purchaseOrderList" :key="index" v-if="status_to_state[item.status] === tabCurrentIndex || tabCurrentIndex === 0"
			class="order-item"
		>
			<view class="i-top b-b">
				<text class="time">{{item.updateTime}}</text>
				<text class="state" style="color: '#fa436a'">{{status_to_state2[item.status]}}</text>
				<text v-if="item.status==='REJECTED'" class="del-btn yticon icon-iconfontshanchu1"></text>
				<text v-if="item.status==='REJECTED'" class="state" style="color: '#909399'">核验未通过</text>
			</view>
			<view class="goods-box-single" @click="status_to_state[item.status] == 1?jumpToPurchaseUpload(item):jumpPurchaseDetail(item)">
				<view class="right">
					<text class="title clamp">{{item.product.name}}</text>
					<text class="attr-box">{{item.product.specification}} x {{item.quantity}}</text>
					<!-- <text class="price" v-if="status_to_state[item.status] == 2 || status_to_state[item.status] == 3">{{item.purchasePrice / 100}}</text> -->
					<text class="reason" v-if="item.status==='REJECTED'">拒绝理由：{{item.rejectReason}}</text>
				</view>
			</view>
			<view class="price-box" v-if="status_to_state[item.status] != 1">
				共
				<text class="num">{{item.quantity}}</text>
				件商品 实付款
				<text class="price">{{item.quantity * item.purchasePrice / 100}}</text>
			</view>
			<view class="action-box b-t" v-if="status_to_state[item.status] == 1">
				<button class="action-btn recom" @click="jumpToPurchaseUpload(item)">上传信息</button>
			</view>
		</view>
		<view v-show="isLoadMore" v-if="purchaseOrderList.length != 0">
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				purchaseRequest: {
					page: '0',
					size: '10'
				},
				purchaseOrderList: [],
				tabCurrentIndex: 0,
				isLoadMore: false,
				loadStatus: 'loading',
				status_to_state: {"READY": 1, "PENDING": 2, "REJECTED": 1, "CONFIRMED": 3, "WAREHOUSED": 4},
				status_to_state2: {"READY": "待采购", "PENDING": "待核验", "REJECTED": "待采购", "CONFIRMED": "待接收", "WAREHOUSED": "已完成"},
				navList: ['全部', '待采购', '待核验', '待接收', '已完成']
			};
		},
		onBackPress(options) {
		    return true
		},
		onLoad() {
			uni.$on('edit', (e) => {
				this.init();
			})
			this.purchaseRequest.buyerId = uni.getStorageSync('user').id
			this.getPurchaseOrderList();
		},
		onUnload() {
			uni.$off('edit');
		},
		onShow() {
			this.noClick = true;
		},
		methods: {
			init() {
				this.purchaseRequest.page = 0;
				this.purchaseRequest.size = 10;
				this.purchaseOrderList = [];
				this.getPurchaseOrderList();
			},
			getPurchaseOrderList() {
				this.$api.http.get('/purchaseOrder/findAllByBuyer', this.purchaseRequest).then(res => {
					this.purchaseOrderList = this.purchaseOrderList.concat(res.content);
					if (res.numberOfElements < this.purchaseRequest.size) {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					} else {
						this.isLoadMore = false
					}
				}).catch(err => {
					this.isLoadMore = true
					if (this.purchaseRequest.page > 1) this.purchaseRequest.page -= 1
				})	
			},
			async jumpPurchaseDetail(purchaseOrder){
				if (!purchaseOrder.product.image) {
					await this.$api.http.get('/product/getImage?id='+purchaseOrder.product.id, null).then(res => {
						purchaseOrder.product.image = res;
					})
				}
				if (purchaseOrder.status != 'CREATED' && purchaseOrder.status != 'READY') {
					if (!purchaseOrder.photo) {
						await this.$api.http.get('/purchaseOrder/getPhoto?id='+purchaseOrder.id, null).then(res => {
							purchaseOrder.photo = res;
						})
						await this.$api.http.get('/purchaseOrder/getInvoice?id='+purchaseOrder.id, null).then(res => {
							purchaseOrder.invoice = res;
						})
					}
				}
				if (this.noClick) {
					this.noClick = false;
					uni.navigateTo({
						url: './PurchaseDetail?purchaseOrder='+encodeURIComponent(JSON.stringify(purchaseOrder))
					})
				}
			},
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			async jumpToPurchaseUpload(purchaseOrder) {
				if (!purchaseOrder.product.image) {
					await this.$api.http.get('/product/getImage?id='+purchaseOrder.product.id, null).then(res => {
						purchaseOrder.product.image = res;
					})
				}
				if (purchaseOrder.status != 'CREATED' && purchaseOrder.status != 'READY') {
					if (!purchaseOrder.photo) {
						await this.$api.http.get('/purchaseOrder/getPhoto?id='+purchaseOrder.id, null).then(res => {
							purchaseOrder.photo = res;
						})
						await this.$api.http.get('/purchaseOrder/getInvoice?id='+purchaseOrder.id, null).then(res => {
							purchaseOrder.invoice = res;
						})
					}
				}
				if (this.noClick) {
					this.noClick = false;
					uni.navigateTo({
						url: './PurchaseUpload?purchaseOrder='+encodeURIComponent(JSON.stringify(purchaseOrder))
					})
				}
			},
			onReachBottom() {
				// 此处判断，上锁，防止重复请求
				if (!this.isLoadMore) { 
					this.isLoadMore = true
					this.purchaseRequest.page += 1
					this.getPurchaseOrderList()
				}
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: #FFFFFF;
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
		border-bottom: 1px solid #EAEAEA;
		// box-shadow: 0 1px 5px rgba(0,0,0,.06);
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		// margin-top: 16upx;
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
			.goods-img{
				display: block;
				width: 135upx;
				height: 135upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 0upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
					padding: 0upx 0upx;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 0upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 0upx;
					}
				}
				.reason {
					font-size: $font-sm + 2upx;
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