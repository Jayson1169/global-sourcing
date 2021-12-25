<template>
	<view class="user_list">
		<view class="search">
			<uni-easyinput suffixIcon="search" v-model="searchRequest.keyword" placeholder="请输入内容" @iconClick="search" color="#A5A5A5"></uni-easyinput>
		</view>
		<!-- <empty v-if="userList.length === 0"></empty> -->
		<block v-for="(item, index) of productList">
			<view class="list" @click="jumpProductDetail(item)">
				<view class="list_l"><image :src="item.image"></image></view>
				<view class="list_r">
					<view>{{item.name}}</view>
					<view class="list_r_01">{{item.brand}}</view>
					<view class="list_r_01">{{item.specification}}</view>
				</view>
			</view>
		</block>
		<view v-show="isLoadMore">
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
		<view class="H60"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpProductAppend" class="cu-btn bg-red margin-tb-sm lg">新增商品</button>
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		data() {
			return {
				userRequest: {
					page: 0,
					size: 10,
				},
				searchRequest: {
					keyword: '',
					page: 0,
					size: 9999,
				},
				c_index: 0,
				productList: [],
				isLoadMore: false,
				loadStatus: 'loading',
				haveSearch: false
			};
		},
		onLoad() {
			// this.getProductList()
		},
		onPullDownRefresh(){
			this.init()
			this.haveSearch = false
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			init() {
				this.userRequest.page = 0
				this.userRequest.size = 10
				this.userList = []
				this.getProductList()
			},
			jumpProductAppend() {
				uni.navigateTo({
					url: './ProductAppend'
				});
			},
			jumpProductDetail(product) {
				uni.navigateTo({
					url: './ProductDetail?product='+encodeURIComponent(JSON.stringify(product))
				})
			},
			num(index) {
				this.c_index = index
			},
			search() {
				this.$api.http.get('/product/search', this.searchRequest).then(res => {
					this.productList = res.content
				})
			},
			getProductList() {
				this.$api.http.get('/product/findByBarcode', this.userRequest).then(res => {
					this.productList = this.productList.concat(res.content);
					if (res.numberOfElements < this.userRequest.size) {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					} else {
						this.isLoadMore = false
					}
				}).catch(err => {
					this.isLoadMore = true
					if (this.userRequest.page > 1) this.userRequest.page -= 1
				})	
			}
		},
		onReachBottom() {
			// 此处判断，上锁，防止重复请求
			if (!this.isLoadMore) { 
				this.isLoadMore = true
				this.userRequest.page += 1
				this.getUserList()
			}
		}
	}
</script>

<style lang="scss">
	.user_list {
		font-size: 30upx;
		.search {
			background: #FFFFFF;
			display: flex;
			width: 100%;
			box-sizing: border-box;
			padding: 10px 10px 0px 10px;
		}
		.list {
			display: flex;
			padding: 10px 0px 5px 10px;
			border-bottom: 1px solid #EAEAEA;
			.list_l {
				padding: 0 10px 0 0;
				image {
					width: 162upx;
					height: 162upx;
					// border-radius: 5px;
				}
			}
			.list_r {
				line-height: 25px;
				.list_r_01 {
					color: #ABABAB;
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
	}
</style>