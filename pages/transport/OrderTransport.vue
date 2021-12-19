<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductTransport(item)">
				<view class='goods_02'>
				  <view class='goods_title'>{{item.product.name}}</view>
				  <view class="goods_des">商品型号：{{item.product.specification}}</view>
				  <view class="goods_des">快递物流：{{item.number}}</view>
				  <view class='good_p'>
					<view class="good_price">¥ {{item.salePrice}}</view>
					<view class='i'>x {{item.quantity}}</view>
				  </view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {"id":19,"createTime":"2021-12-19 19:18:07","updateTime":"2021-12-19 19:18:07","salesperson":{"id":1,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"admin","password":"$2a$10$P8UFgtFSeCz.57PbNf2sRuOz2qg8JFJx9.wfJdNsX/7BuNzGvWeg2","name":"admin","role":"ADMIN","phoneNumber":null},"address":{"id":21,"createTime":"2021-12-19 19:18:07","updateTime":"2021-12-19 19:18:07","name":"殷鑫","idNumber":"467489199910247815","phoneNumber":"15858780802","shipAddress":"湖南省长沙市天心区中南大学铁道学院"},"items":[{"id":57,"createTime":"2021-12-19 19:18:07","updateTime":"2021-12-19 19:18:07","product":{"id":64,"createTime":"2021-12-19 19:18:07","updateTime":"2021-12-19 19:18:07","name":"清风牌面巾纸","barcode":null,"specification":"150抽/包","image":null,"manufacturer":null,"origin":null,"remark":null},"salePrice":400,"quantity":7},{"id":58,"createTime":"2021-12-19 19:18:18","updateTime":"2021-12-19 19:18:18","product":{"id":65,"createTime":"2021-12-19 19:18:18","updateTime":"2021-12-19 19:18:18","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":"无备注"},"salePrice":2500,"quantity":4}]}
			};
		},
		onLoad(option) {
			uni.$on('send', (e) => {
				console.log(e.number)
				this.order.items.some((item, i) => {
					if (item.id == e.id) {
						this.$set(this.order.items, i, e)  
					}
				})
			})
			this.order = JSON.parse(decodeURIComponent(option.order));
		},
		onUnload() {
			uni.$off('send')
		},
		methods: {
			jumpProductTransport(item) {
				uni.navigateTo({
					url: './ProductTransport?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
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
