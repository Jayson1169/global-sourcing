<template>
	<view class="product">
		<view class="detail">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductTransport(item)">
				<view>
					<myimg :photo="item.product.image"></myimg>
				</view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='good_p'>
						<!-- <view class="goods_des" v-if="item.delivered">快递物流：{{item.expressNumbers[0]}}</view> -->
						<!-- <view class="good_price">¥ {{item.salePrice / 100}}</view> -->
						<view class='i'>x {{item.quantity}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detail">收货明细</view>
		<view class="cu-form-group">
			<view class="cu-form-title">收货信息：{{order.address}}</view>
		</view>
		<view class="detail">发货明细</view>
		<view class="cu-form-group" >
			<text :style="{color:'red'}">*</text>
			<view class="title">物流单号：</view>
			<input placeholder="请扫描或输入物流单号" v-model="expressNumber"></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">物流公司：</view>
			<input placeholder="请输入物流公司" v-model="expressCompany"></input>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {"id":5,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","salesperson":{"id":1,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"admin","password":"$2a$10$P8UFgtFSeCz.57PbNf2sRuOz2qg8JFJx9.wfJdNsX/7BuNzGvWeg2","name":"admin","role":"ADMIN","phoneNumber":null},"address":{"id":5,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","name":"test","idNumber":"111111111111111111","phoneNumber":"11111111111","shipAddress":"test"},"items":[{"id":9,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","product":{"id":9,"createTime":"2021-12-22 16:23:38","updateTime":"2021-12-22 16:23:38","name":"iPhone 13 Pro","barcode":"1111111111111","specification":"MLT83CH/A","image":null,"manufacturer":"富士康","origin":"中国","remark":"iPhone"},"salePrice":2,"quantity":2}]},
				expressCompany: '',
				expressNumber: ''
			};
		},
		onLoad(option) {
			uni.$on('edit', (e) => {
				this.order = e;
			})
			this.order = JSON.parse(decodeURIComponent(option.order));
		},
		onUnload() {
			uni.$off('edit');
		},
		methods: {
			jumpProductTransport(item) {
				uni.navigateTo({
					url: './ProductTransport?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
			sub() {
				let rules = [
					{name: 'expressNumber', type: 'required', errmsg: '请输入物流单号'},
					{name: 'expressCompany', type: 'required', errmsg: '请输入物流公司'},
				]
				let valLoginRes = this.$validate.validate(this.order, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/saleOrder/deliver?id='
							+this.order.id+'&expressCompany'+this.expressCompany+'&expressNumber='+this.expressNumber, null).then(res => {
						this.$api.msg.successToast('发送成功').then(res => {
							uni.navigateBack();
						})
					}, error => {
						this.$api.msg.toast(error);
					})
				}
			},
			getScanCode() {
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						this.expressNumber = res.result
					}
				})
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	.o_btn {
		background: #FFFFFF;
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
		}
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
</style>
