<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods " v-for="(item,index) of order_pro" :key="index">
				<!-- <view><img :src="item.pic"></img></view> -->
				<view class='goods_02'>
				  <view class='goods_title'>{{item.title}}</view>
				  <view class="goods_des">{{item.guige[0].name}}：{{item.guige[0].value}}</view>
				  <view class='good_p'>
					<view class="good_price">¥ {{item.price}}</view>
					<view class='i'>x {{item.num}}</view>
				  </view>
				</view>
			</view>
			<view class="goods goods_add" @click="jump_to_product">
				<text class="iconfont icon-jiahao"></text>
				<text>点击添加商品</text>
				<!-- <button class="p_btn" @click="sub()"></button> -->
			</view>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">商品名称：</view>
			<input placeholder="请输入商品名称" v-model="order_form.product" focus></input>
		</view>
		<view class="cu-form-group">
			<view class="title">订&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</view>
			<input placeholder="请输入订金" v-model="order_form.deposit"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">销售价格：</view>
			<input placeholder="请输入销售价格" v-model="order_form.sale_price"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">成交价格：</view>
			<input placeholder="请输入成交价格" v-model="order_form.transaction_price"></input>
		</view> -->
		<view class="order">收货信息</view>
		<view class="cu-form-group">
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input placeholder="请输入姓名" v-model="order_form.name"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证号：</view>
			<input placeholder="请输入身份证号" v-model="order_form.id" maxlength="18"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码：</view>
			<input placeholder="请输入手机号码" v-model="order_form.phone"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址：</view>
			<input placeholder="请输入收货地址" v-model="order_form.address"></input>
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
				order_form: {
					product: '',
					deposit: '',
					sale_price: '',
					transaction_price: ''
				},
				user_form: {
					name: '',
					id: '',
					phone: '',
					address: ''
				}
			};
		},
		onLoad() {
			this.order_pro = this.$api.json.order_pro
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
			jump_to_product() {
				
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
	.p_btn {
		// background: #F7F6FB;
		// padding: 0 10px 0px;
		// position: fixed;
		// bottom: 0;
		width: 100%;
		font-size: 13px;
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
