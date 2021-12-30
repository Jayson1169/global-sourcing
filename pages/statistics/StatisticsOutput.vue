<template>
	<view class="user_list">
		<!-- <view class="navbar">
			<view 
				class="nav-item"
				:class="{current: tabCurrentIndex === index}"
				v-for="(item, index) in navList" :key="index" 
				@click="tabClick(index)"
			>
				{{item}}
			</view>
		</view> -->
		<view class="uni-list">
			<checkbox-group @change="salesCheckbox">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in totalFinance.salespersonFinanceItems" :key="index">
					<view class="list">
						<checkbox class="radio" :value="item.salesperson.id" :checked="index === salesCurrent" />
						<view class="list_l"></view>
						<view class="list_r">
							<view class="list_r_01">{{item.salesperson.username}}<span class="hui">{{status_to_state[item.salesperson.role]}}</span></view>
							<view class="list_r_02">{{item.salesperson.name}}</view>
						</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="uni-list">
			<checkbox-group @change="buyerCheckbox">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in totalFinance.buyerFinanceItems" :key="index">
					<view class="list">
						<checkbox class="radio" :value="item.buyer.id" :checked="index === buyerCurrent"/>
						<view class="list_l"></view>
						<view class="list_r">
							<view class="list_r_01">{{item.buyer.username}}<span class="hui">{{status_to_state[item.buyer.role]}}</span></view>
							<view class="list_r_02">{{item.buyer.name}}</view>
						</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
			<view class="flex flex-direction" >
				<button @click="output" class="cu-btn bg-red margin-tb-sm lg">导出</button>
			</view>
		</view>	
	</view>
</template>

<script>
	import { exportFile } from '@/common/exportFile.js'
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				status_to_state: {"ADMIN": "管理员", "SALESPERSON": "销售员", "BUYER": "采购员"},
				navList: ['销售', '采购'],
				salesCurrent: '',
				buyerCurrent: '',
				totalFinance: '',
				user: [],
			};
		},
		onLoad(option) {
			this.totalFinance = JSON.parse(decodeURIComponent(option.totalFinance));
		},
		methods: {
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			salesCheckbox: function (e) {
				this.salesCurrent = e.detail.value;
			},
			buyerCheckbox: function (e) {
				this.buyerCurrent = e.detail.value;
			},
			output() {
				this.outputSales()	
				this.outputPurchase()
			},
			outputSales() {
				// 要导出的json数据
				var items = this.totalFinance.salespersonFinanceItems;
				const jsonData = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (this.salesCurrent.includes(item.salesperson.id)) {
						var data = {
							name: '',
							saleOrderQuantity: '',
							sales: ''
						}
						data.name = item.salesperson.name;
						data.sales = item.sales / 100;
						data.saleOrderQuantity = item.saleOrderQuantity;
						jsonData.push(data);
					}
				}				
				// 列标题
				let worksheet = 'sheet1'
				let str = '<tr><td>姓名</td><td>订单数</td><td>金额 ￥</td></tr>'
				// 循环遍历，每行加入tr标签，每个单元格加td标签
				for (let i = 0; i < jsonData.length; i++) {
					str += '<tr>'
					for (let item in jsonData[i]) {
						// 增加\t为了不让表格显示科学计数法或者其他格式
						str += `<td>${jsonData[i][item] + '\t'}</td>`
					}
					str += '</tr>'
				}
				// 下载的表格模板数据
				let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
				xmlns:x="urn:schemas-microsoft-com:office:excel" 
				xmlns="http://www.w3.org/TR/REC-html40">
				<head><!--[if gte mso 9]><xml encoding="UTF-8"><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
				<x:Name>${worksheet}</x:Name>
				<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
				</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
				</head><body><table>${str}</table></body></html>`
				// 下载模板
				exportFile(template, "导出财务信息", "销售财务信息")
			},
			outputPurchase() {
				// 要导出的json数据
				var items = this.totalFinance.buyerFinanceItems;
				const jsonData = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (this.buyerCurrent.includes(item.buyer.id)) {
						var data = {
							name: '',
							purchaseOrderQuantity: '',
							purchases: ''
						}
						data.name = item.buyer.name;
						data.purchases = item.purchases / 100;
						data.purchaseOrderQuantity = item.purchaseOrderQuantity;
						jsonData.push(data);
					}
				}
				// 列标题
				let worksheet = 'sheet1'
				let str = '<tr><td>姓名</td><td>采购数</td><td>金额 ￥</td></tr>'
				// 循环遍历，每行加入tr标签，每个单元格加td标签
				for (let i = 0; i < jsonData.length; i++) {
					str += '<tr>'
					for (let item in jsonData[i]) {
						// 增加\t为了不让表格显示科学计数法或者其他格式
						str += `<td>${jsonData[i][item] + '\t'}</td>`
					}
					str += '</tr>'
				}
				// 下载的表格模板数据
				let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
				xmlns:x="urn:schemas-microsoft-com:office:excel" 
				xmlns="http://www.w3.org/TR/REC-html40">
				<head><!--[if gte mso 9]><xml encoding="UTF-8"><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
				<x:Name>${worksheet}</x:Name>
				<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
				</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
				</head><body><table>${str}</table></body></html>`
				// 下载模板
				exportFile(template, "导出财务信息", "采购财务信息")
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}
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
