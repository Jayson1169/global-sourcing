<template>
	<view class="index">
		<view>
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
					<!-- <view class="shuju_01_s" v-if="shop.today[0].today_money_total">{{shop.today[0].today_num_total}} / ¥{{shop.today[0].today_money_total}}</view> -->
					<view class="shuju_01_s">0 / ¥0</view>
				</view>
				<view class="shuju_01 no">
					<view>昨日订单/金额</view> 
					<!-- <view class="shuju_01_s" v-if="shop.yesterday[0].yesterday_money_total">{{shop.yesterday[0].yesterday_num_total}} / -->
					 <!-- ¥{{shop.yesterday[0].yesterday_money_total}}</view> -->
					 <view class="shuju_01_s">0 / ¥0</view>
				</view>
				<view class="shuju_01">
					<view>总订单数</view>
					<view class="shuju_01_s">100</view>
				</view>
				<view class="shuju_01 no">
					<view>总销售金额</view>
					<!-- <view class="shuju_01_s" v-if="shop.total[0].all_money_total">¥ {{shop.total[0].all_money_total}}</view> -->
					 <view class="shuju_01_s" >0 </view>
				</view>
				<view class="shuju_01">
					<view>今日采购/金额</view>
					<!-- <view class="shuju_01_s" v-if="shop.today[0].today_money_total">{{shop.today[0].today_num_total}} / ¥{{shop.today[0].today_money_total}}</view> -->
					<view class="shuju_01_s" >0 / ¥0</view>
				</view>
				<view class="shuju_01 no">
					<view>今日采购/金额</view> 
					<!-- <view class="shuju_01_s" v-if="shop.yesterday[0].yesterday_money_total">{{shop.yesterday[0].yesterday_num_total}} / -->
					 <!-- ¥{{shop.yesterday[0].yesterday_money_total}}</view> -->
					 <view class="shuju_01_s" >0 / ¥0</view>
				</view>
				<view class="shuju_01">
					<view>总订单数</view>
					<view class="shuju_01_s">12</view>
				</view>
				<view class="shuju_01 no">
					<view>总销售金额</view>
					<!-- <view class="shuju_01_s" v-if="shop.total[0].all_money_total">¥ {{shop.total[0].all_money_total}}</view> -->
					 <view class="shuju_01_s" >0 </view>
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
	import { formatDateThis, getUnixTime } from '@/common/dateUtil.js'
	export default {
		data() {
			return {
				todayFinance: '',
				yesterdayFinance: ''
			}
		},
		onLoad() {  
			// 昨天的时间
			// var day1 = new Date();
			// day1.setTime(day1.getTime()-24*60*60*1000);
			// var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
			// //今天的时间
			// var day2 = new Date();
			// day2.setTime(day2.getTime());
			// var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
			// console.log(s1, s2)
			// this.shop = this.$api.json.count_order
			// this.$api.http.get('/finance/countFinance')
		},
		methods: {
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
			line-height: 25px;
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