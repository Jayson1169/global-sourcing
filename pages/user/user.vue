<template>
	<view class="user_list">
		<view class="search">
			<uni-easyinput suffixIcon="search" v-model="searchRequest.keyword" placeholder="请输入内容" @iconClick="search" confirmType="search" @confirm="search"></uni-easyinput>
		</view>
		<scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
			<view class='tab'>
				<view :class="c_index==0?'tab_focus':'tab_normal'" @click="num(0)">全部</view>
				<block v-for="(item, index) of roleList">
					<view :class="c_index==(index+1)?'tab_focus':'tab_normal'" @click="num(index+1)">{{item}}</view>
				</block>
			</view>
		</scroll-view>
		<block v-for="(item, index) of userList" v-if="c_index==0||roleMap[item.role][1]==c_index - 1">
			<view class="list" @click="jumpPasswordReset(item)">
				<view class="list_l"></view>
				<view class="list_r">
					<view class="list_r_01">{{item.username}}<span class="hui">{{roleMap[item.role][0]}}</span></view>
					<view class="list_r_02">{{item.name}}</view>
					<view class="list_r_02">{{item.phoneNumber}}</view>
				</view>
			</view>
		</block>
		<view v-show="isLoadMore" v-if="userList.length != 0">
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="jumpUserAppend" class="cu-btn bg-red margin-tb-sm lg">新增用户</button>
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
				userList: [],
				roleList: '',
				roleMap: '',
				isLoadMore: false,
				loadStatus: 'loading',
			};
		},
		onLoad() {
			this.getUserList()
			this.roleList = this.$api.json.role_list;
			this.roleMap = this.$api.json.role_map;
		},
		onShow() {
			this.init()
		},
		onPullDownRefresh(){
			this.init()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			init() {
				this.userRequest.page = 0
				this.userRequest.size = 10
				this.userList = []
				this.getUserList()
			},
			jumpPasswordReset(item) {
				uni.navigateTo({
					url: './PasswordReset?id='+item.id+'&username='+item.username+'&name='+item.name+'&phoneNumber='+item.phoneNumber
				});
			},
			jumpUserAppend() {
				uni.navigateTo({
					url: './UserAppend'
				});
			},
			num(index) {
				this.c_index = index
			},
			search() {
				this.$api.http.get('/user/search', this.searchRequest).then(res => {
					this.userList = res.content
				})
			},
			getUserList() {
				this.$api.http.get('/user/findAll', this.userRequest).then(res => {
					this.userList = this.userList.concat(res.content);
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
			padding: 10px;
		}
		.tab {
			font-size: 30upx;
			padding: 10px;
			display: flex;
			width: 100%;
			.tab_normal {
				padding-bottom: 5px;
				min-width: 80px;
				text-align: center;
			}
			.tab_focus {
				border-bottom: 2px solid red;
				padding-bottom: 5px;
				min-width: 80px;
				text-align: center;
			}
		}
		.list {
			display: flex;
			padding: 10px;
			border-bottom: 1px solid #EAEAEA;
			.list_l {
				padding: 0 10px 0 0;
			}
			.list_r {
				line-height: 25px;
				.list_r_01 {
					.hui {
						border: 1px solid #FF6D6D;
						border-radius: 3px;
						color: #ff6d6d;
						padding: 0 5px;
						margin-left: 8px;
					}
				}
				.list_r_02 {
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
