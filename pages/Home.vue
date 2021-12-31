<template>
	<view class="index">
		<view v-if="totalFinance && todayFinance">
			<view class="more">
				<view class='mo'>
					<view class='mo_01'>财务分析</view>
					<navigator url="/pages/statistics/Statistics" hover-class="none"> 
						<view class='mo_02'>更多</view>
					</navigator>
				</view>
			</view>
			<view class="shuju">
				<view class="shuju_01">
					<view>今日订单/金额</view>
					<view class="shuju_01_s">{{todayFinance.saleOrderQuantity}} / ¥{{todayFinance.sales / 100}}</view>
				</view>
				<view class="shuju_01 no">
					<view>总订单/金额</view>
					<view class="shuju_01_s">{{totalFinance.saleOrderQuantity}} / ¥{{totalFinance.sales / 100}}</view>
				</view>
				<view class="shuju_01">
					<view>今日采购/金额</view> 
					 <view class="shuju_01_s">{{todayFinance.purchaseOrderQuantity}} / ¥{{todayFinance.purchases / 100}}</view>
				</view>
				<view class="shuju_01 no">
					<view>总采购/金额</view>
					<view class="shuju_01_s">{{totalFinance.purchaseOrderQuantity}} / ¥{{totalFinance.purchases / 100}}</view>
				</view>
				<view class="shuju_01">
					<view>今日经营收入</view> 
					 <view class="shuju_01_s" >¥{{(todayFinance.sales - todayFinance.purchases) / 100}}</view>
				</view>
				<view class="shuju_01 no">
					<view>总经营收入</view> 
					 <view class="shuju_01_s" >¥{{(totalFinance.sales - totalFinance.purchases) / 100}}</view>
				</view>
			</view>
		</view>
		<view class="BH"></view>
		<view class="more">
			<view class='mo'>
				<view class='mo_01'>管理模块</view>
			</view>
		</view>
		<view class="six">
			<view class="jiu_01">
				<navigator url="/pages/user/User" hover-class="none">
					<view><image src="../imgs/user.png"/></view>
					<view>用户管理</view>
				</navigator>
			</view> 
			<view class="jiu_01">
				<navigator url="/pages/product/Product" hover-class="none"> 
					<view><image src="../imgs/product.png"/></view>
					<view>商品管理</view>
				</navigator>
			</view>
			<view class="jiu_01">
				<navigator url="/pages/order/Order" hover-class="none">
					<view><image src="../imgs/order.png"/></view>
					<view>订单管理</view>
				</navigator>
			</view>
			<view class="jiu_01">
				<navigator url="/pages/purchase/Purchase" hover-class="none">
					<view><image src="../imgs/buyer.png"/></view>
					<view>采购管理</view>
				</navigator>
			</view>
			<view class="jiu_01">
				<navigator url="/pages/statistics/Statistics" hover-class="none"> 
					<view><image src="../imgs/treasure.png"/></view>
					<view>财务分析</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayFinance: '',
				totalFinance: '',
			}
		},
		onLoad() {  
			this.getFinance();
		},
		methods: {
			async getFinance() {
				var day = new Date();
				day.setTime(day.getTime());
				var today = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
				await this.$api.http.get('/finance/countFinance?startDate=2021-12-29'+'&endDate='+today, null).then(res => {
					this.totalFinance = res;
				})
				await this.$api.http.get('/finance/countCurrentFinance', null).then(res => {
					this.todayFinance = res;
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		background:#fff;
		.H50{
			height:50px;
		}
		.head {
			background:  linear-gradient(to bottom, #52c693, #27a26c);
			text-align: center;
			padding: 20px 0 10px;
			color: #fff;
			font-size: 30upx;
		}
		.jiu {
			padding: 10px;
			display: flex;
			flex-wrap: wrap;
			color: #fff;
		}
		.jiu_01 {
			width: 33%;
			text-align: center;
			padding: 15px 10px 15px;
			box-sizing: border-box;
			font-size: 30upx;
		}
		.jiu_01 image {
			width: 32px;
			height: 32px;
			margin-bottom: 10px;
		}
		.mo {
			padding: 10px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f0f0f0;
			line-height: 20px;
		}
		.mo_01 {
			padding-left: 10px;
			box-sizing: border-box;
			width: 80%;
			height: 20px;
			overflow: hidden;
			border-left: 3px solid #EC521B;
			font-size: 30upx;
			font-weight: bold;
		}
		.mo_01 span {
			color: #8E8E8E;
			font-weight: 100;
			font-size: 30upx;
			padding-left: 10px;
		}
		.mo_02 {
			// color: #D6D6D6;
			color: black;
			font-size: 30upx;
			font-weight: bold;
		}
		.shuju {
			display: flex;
			flex-wrap: wrap;
		}
		.shuju_01 {
			width: 50%;
			text-align: center;
			padding: 18px 10px;
			box-sizing: border-box;
			font-size: 30upx;
			line-height: 20px;
			border-right: 1px solid #f0f0f0;
			border-bottom: 1px solid #f0f0f0;
		}
		.shuju_01_s {
			color: #EB511B;
			font-weight: 800;
			font-size: 30upx;
		}
		.no {
			border-right: none;
		}
		.BH {
			background-color: #F1F1F1;
			height: 5px;
		}
		.six {
			padding: 10px;
			display: flex;
			flex-wrap: wrap;
		}
		.list_01 {
			padding: 15px 10px 8px;
			border-bottom: 1px solid #F4F4F4;
			font-size: 12px;
		}
	}
</style>