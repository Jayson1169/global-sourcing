<template>
	<view class="user_list">
		<view class="search">
			<uni-easyinput suffixIcon="search" v-model="searchRequest.keyword" placeholder="请输入内容" @iconClick="search" color="#A5A5A5" confirmType="search" @confirm="search"></uni-easyinput>
		</view>
		<block v-for="(item, index) of productList">
			<view class="list" @click="jumpProductModify(item)">
				<view class="list_l"></view>
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
				searchRequest: {
					keyword: '',
					page: 0,
					size: 10,
				},
				c_index: 0,
				productList: [],
				isLoadMore: false,
				loadStatus: 'loading',
			};
		},
		onShow() {
			this.noClick = true;
		},
		onLoad() {
			uni.$on('modify', (e) => {
				this.productList.some((item, i) => {
					if (item.id == e.id) {
						this.$set(this.productList, i, e)  
					}
				})
			})
			uni.$on('delete', (e) => {
				this.productList.some((item, i) => {
					if (item.id == e.id) {
						this.productList.splice(i, 1)
					}
				})
			})
		},
		methods: {
			jumpProductAppend() {
				uni.navigateTo({
					url: './ProductAppend'
				});
			},
			jumpProductModify(product) {
				this.$api.http.get('/product/getImage?id='+product.id, null).then(res => {
					product.image = res
					if (this.noClick) {
						this.noClick = false;
						uni.navigateTo({
							url: './ProductModify?product='+encodeURIComponent(JSON.stringify(product))
						})
					}
				})
			},
			num(index) {
				this.c_index = index
			},
			getProductList() {
				this.$api.http.get('/product/search', this.searchRequest).then(res => {
					this.productList = this.productList.concat(res.content);
					if (res.numberOfElements < this.searchRequest.size) {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					} else {
						this.isLoadMore = false
					}
				}).catch(err => {
					this.isLoadMore = true
					if (this.searchRequest.page > 1) this.searchRequest.page -= 1
				})	
			},
			search() {
				// 每次搜索初始化分页
				this.searchRequest.page = 0;
				this.searchRequest.size = 10;
				this.productList = [];
				this.getProductList();
			}
		},
		onReachBottom() {
			// 此处判断，上锁，防止重复请求
			if (!this.isLoadMore) { 
				this.isLoadMore = true
				this.searchRequest.page += 1
				this.getProductList()
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
				}
			}
			.list_r {
				line-height: 55upx;
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