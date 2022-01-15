<template>
	<view class="product">
		<view class="detail">订单明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of order.items" :key="index" @click="jumpProductItemEdit(item, index)">
				<view>
					<myimg :photo="item.product.image"></myimg>
				</view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='good_p'>
						<view class="good_price">¥ {{item.salePrice / 100}}</view>
						<view class='i'>x {{item.quantity}}</view>
					</view>
				</view>
			</view>
			<view class="goods goods_add" @click="jumpProductItemAppend">
				<text class="iconfont icon-jiahao"></text>
				<text>点击添加商品项</text>
			</view>
		</view>
		<view class="detail">收货明细</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">是否采购：</view>
			<switch @change="switchChange" :disabled="disabled" :checked="needPurchase"/>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">收货信息：</view>
			<input placeholder="请输入收货信息" v-model="order.address"></input>
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
				order: {
					items: [],
					address: ''
				},
				needPurchase: true,
				disabled: false
			};
		},
		onLoad(option) {
			uni.$on('append', (e) => {
				this.order.items = this.order.items.concat(e)
				this.checkSend();
			})
			uni.$on('modify', (e) => {
				this.order.items.some((item, i) => {
					if (item.id == e.id) {
						this.$set(this.order.items, i, e)  
					}
				})
				this.checkSend();
			})
			uni.$on('delete', (e) => {
				this.order.items.some((item, i) => {
					if (item.id == e.id) {
						this.order.items.splice(i, 1)
					}
				})
				this.checkSend();
			})
		},
		methods: {
			checkSend() {
				this.disabled = false;
				this.order.items.some((item, i) => {
					if (item.product.inventory.midwayInventory + item.product.inventory.hubInventory < item.quantity) {
						this.needPurchase = true;
						this.disabled = true;
					}
				})
			},
			sub() { 
				let rules = [
					// {name: 'name', type: 'required', errmsg: '请输入姓名'},
					// {name: 'idNumber', type: 'required', errmsg: '请输入身份证号'},
					// {name: 'idNumber', type: 'idNumber', errmsg: '请正确输入身份证号'},
					{name: 'address', type: 'required', errmsg: '请输入收货信息'}
				]
				let valLoginRes = this.$validate.validate(this.order, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					var param = this.needPurchase?"needPurchase=false":"needPurchase=true"
					this.$api.http.post('/saleOrder/insert?'+param, this.order).then(res => {
						this.$api.msg.successToast('添加成功').then(res => {
							uni.navigateBack();
							uni.$emit('edit', this.order)
						})
					}, error => {
						this.$api.msg.toast(error);
					})
				}	
			},
			jumpProductItemAppend() {
				uni.navigateTo({
					url: './ProductItemAppend'
				});
			},
			jumpProductItemEdit(item, index) {
				uni.navigateTo({
					url: './ProductItemEdit?item='+encodeURIComponent(JSON.stringify(item))
				});
			},
			switchChange: function (e) {
				this.needPurchase = e.target.value
			}
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
		// 13px
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
