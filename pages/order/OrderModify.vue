<template>
	<view class="product">
		<view class="order">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductEdit(item)">
				<view>
					<myimg :photo="item.product.photo"></myimg>
				</view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='good_p'>
						<view class="good_price">¥ {{item.salePrice}}</view>
						<view class='i'>x {{item.quantity}}</view>
					</view>
				</view>
			</view>
			<view class="goods goods_add" @click="jumpProductAppend">
				<text class="iconfont icon-jiahao"></text>
				<text>点击添加商品项</text>
			</view>
		</view>
		<view class="order">收货信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input placeholder="请输入姓名" v-model="order.address.name"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">身份证号：</view>
			<input type="idcard" placeholder="请输入身份证号" v-model="order.address.idNumber" maxlength="18"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">手机号码：</view>
			<input type="number" placeholder="请输入手机号码" v-model="order.address.phoneNumber" maxlength="11"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">收货地址：</view>
			<input placeholder="请输入收货地址" v-model="order.address.shipAddress"></input>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">修改订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {
					items: [],
					address: {
						name: 'test',
						idNumber: '111111111111111111',
						phoneNumber: '11111111111',
						shipAddress: 'test'
					}
				}
			};
		},
		onLoad(option) {
			uni.$on('append', (e) => {
				this.$api.http.post('/saleOrder/insertItem?saleOrderId='+this.order.id, e).then(res => {
					this.$api.msg.successToast('添加成功')
					this.order.items = this.order.items.concat(e)
					uni.$emit('edit', null)
				})
			})
			uni.$on('modify', (e) => {
				this.$api.http.put('/saleOrder/updateItem', e).then(res => {
					this.$api.msg.successToast('修改成功')
					this.order.items.some((item, i) => {
						if (item.id == e.id) {
							this.$set(this.order.items, i, e)  
						}
					})
					uni.$emit('edit', null)
				})
			})
			uni.$on('refund', (e) => {
				this.$api.http.delete('/saleOrder/deleteItem?saleOrderId='+this.order.id+'&itemId='+e.id, null).then(res => {
					this.$api.msg.successToast('退款成功')
					this.order.items.some((item, i) => {
						if (item.id == e.id) {
							this.order.items.splice(i, 1)
						}
					})
					uni.$emit('edit', null)
				})
			})
			this.order = JSON.parse(decodeURIComponent(option.order));
		},
		onUnload() {  
			// 移除监听事件  
			uni.$off('append');  
			uni.$off('modify');
			uni.$off('refund');
		},
		methods: {
			sub() { 
				let rules = [
					{name: 'name', type: 'required', errmsg: '请输入姓名'},
					{name: 'idNumber', type: 'required', errmsg: '请输入身份证号'},
					{name: 'idNumber', type: 'idNumber', errmsg: '请正确输入身份证号'},
					{name: 'shipAddress', type: 'required', errmsg: '请输入收货地址'}
				]
				let valLoginRes = this.$validate.validate(this.order.address, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/saleOrder/update', this.order).then(res => {
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						uni.navigateTo({
							url: './Order'
						});
					})
				}	
			},
			jumpProductAppend() {
				uni.navigateTo({
					url: './ProductAppend'
				});
			},
			jumpProductEdit(item) {
				uni.navigateTo({
					url: './ProductEdit?item='+encodeURIComponent(JSON.stringify(item))
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
