<template>
	<view class="user_list">
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in buyer" :key="index">
					<view class="list">
						<radio class="radio" :value="item.id" :checked="index === current" />
						<view class="list_l"></view>
						<view class="list_r">
							<view class="list_r_01">{{item.username}}</view>
							<view class="list_r_02">{{item.name}}</view>
						</view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="sub" class="cu-btn bg-red margin-tb-sm lg">确定分配</button>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',
				buyer: '',
				request: {
					role: 'BUYER',
					page: 0,
					size: 1000
				},
				purchaseOrderId: '',
				buyerId: '',
				quantity: ''
			};
		},
		onLoad(option) {
			this.purchaseOrderId = option.purchaseOrderId
			this.quantity = option.quantity
			this.$api.http.get('/user/findAllByRole', this.request).then(res => {
				this.buyer = res.content
			})
		},
		methods: {
			radioChange: function(evt) {
				this.buyerId = evt.detail.value
			},
			sub() {	
				let _this = this;
				uni.showModal({
					title: '确定采购数量',
					cancelText: "取消",  
					confirmText: "确定",
					editable: true,
					content: _this.quantity,
					placeholderText: "请输入采购数量",
					success: function(res) {
						if (res.confirm) {
							_this.$api.http.put('/purchaseOrder/assign?purchaseOrderId='
									+_this.purchaseOrderId+'&buyerId='+_this.buyerId+'&quantity='+res.content, '').then(res => {
								_this.$api.msg.successToast("分配成功").then(res => {
									uni.$emit('edit');
									uni.navigateBack({
										delta: 1
									})
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
	.user_list {
		.radio {
			display: flex;
			padding: 10px;
		}
		.list {
			display: flex;
			padding: 10px;
			width: 750rpx;
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
						font-size: 12px;
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
