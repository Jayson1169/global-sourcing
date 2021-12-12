<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of saleOrder.items" :key="index">
				<view class='goods_02'>
				  <view class='goods_title'>{{item.product.name}}</view>
				  <!-- 可以循环显示多个属性 此处修改为显示单独描述 -->
				  <!-- <view class="goods_des">{{item.guige[0].name}}：{{item.guige[0].value}}</view> -->
				  <view class="goods_des">商品型号：{{item.product.brand}}</view>
				  <view class='good_p'>
					<view class="good_price">¥ {{item.salePrice}}</view>
					<view class='i'>x {{item.quantity}}</view>
				  </view>
				</view>
			</view>
			<view class="goods goods_add" @click="jump_product_append">
				<text class="iconfont icon-jiahao"></text>
				<text>点击添加商品</text>
			</view>
		</view>
		<view class="order">收货信息</view>
		<view class="cu-form-group">
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input placeholder="请输入姓名" v-model="saleOrder.address.name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证号：</view>
			<input placeholder="请输入身份证号" v-model="saleOrder.address.idNumber" maxlength="18"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码：</view>
			<input placeholder="请输入手机号码" v-model="saleOrder.address.phoneNumber"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址：</view>
			<input placeholder="请输入收货地址" v-model="saleOrder.address.shipAddress"></input>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">添加订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				saleOrder: {
					salesperson: '1',
					address: {
						name: '1',
						idNumber: '2',
						phoneNumber: '3',
						shipAddress: '4'
					},
					items: []
				}
			};
		},
		onLoad() {
			uni.$on('item', (e) => {
				this.saleOrder.items = this.saleOrder.items.concat(e)
			})
		},
		methods: {
			sub() { 
				this.$api.http.post('/user/insert', this.user_form).then(res => {
					uni.showToast({
						title: '添加成功',
						icon: 'none'
					})
					this.init()
				})
			},
			jump_product_append() {
				uni.navigateTo({
					url: '../product_append/product_append'
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.order {
		padding: 10px 10px 10px 10px;
	}
	.o_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
	}
	.goods_add {
		font-size: 13px;
		justify-content: center;
		align-items: center;
	}
	.tag-e {
		background-color:#fff;
		margin-bottom: 0px;
		font-size: 13px;
		.goods {
			display: flex;
			width: 100%;
			background-color: #ffffff;
			padding: 10px;
			box-sizing: border-box;
			border-bottom: 1px solid #EEF0EF;
			.goods_02 {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				height: 160rpx;
				flex-grow: 1;
				justify-content: space-between;
				padding-top: 10rpx;
				padding-left: 25rpx;
			}
			.goods_title {
				max-height: 40px;
				overflow: hidden;
				line-height: 20px;
				font-weight: 600;
			}
			.goods_des {
				color: #979797;
			}
			.good_p { 
				display: flex;
				justify-content: space-between;
				.good_price {
					color: #F04E42;
					font-weight: 600;
				}
			}
		}
	}
</style>
