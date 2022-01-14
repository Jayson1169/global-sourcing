<template>
	<view class="product">
		<view class="detail">商品明细</view>
		<view class='tag-e'>
			<view class="goods" v-for="(item, index) of expressOrder.items" :key="index" @click="jumpExpressOrderItemEdit(item, index)">
				<view>
					<myimg :photo="item.product.image"></myimg>
				</view>
				<view class='goods_02'>
					<view class='goods_title'>{{item.product.name}}</view>
					<view class="goods_des">商品型号：{{item.product.specification}}</view>
					<view class='good_p'>
						<view class='i'>x {{item.quantity}}</view>
					</view>
				</view>
			</view>
			<view class="goods goods_add" @click="jumpExpressOrderItemAppend">
				<text class="iconfont icon-jiahao"></text>
				<text>点击添加商品项</text>
			</view>
		</view>
	<!-- 	<view class="detail">物流信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">物流单号：</view>
			<input placeholder="请扫描或输入物流单号" v-model="expressOrder.expressNumber"></input>
			<image src="../../imgs/scan.png" style="width: 80rpx; height: 80rpx;" @click="getScanCode"></image>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">物流公司：</view>
			<input placeholder="请输入物流公司" v-model="expressOrder.expressCompany"></input>
		</view> -->
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">添加物流单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatDateThis, getUnixTime } from '@/common/dateUtil.js'
	import { exportFile } from '@/common/exportFile.js'
	export default {
		data() {
			return {
				expressOrder: {
					items: []
				}
			};
		},
		onLoad(option) {
			uni.$on('append', (e) => {
				this.expressOrder.items = this.expressOrder.items.concat(e)
			})
			uni.$on('modify', (e) => {
				this.expressOrder.items.some((item, i) => {
					if (i == e.id) {
						this.$set(this.expressOrder.items, i, e)  
					}
				})
			})
			uni.$on('delete', (e) => {
				this.expressOrder.items.some((item, i) => {
					if (i == e.id) {
						this.expressOrder.items.splice(i, 1)
					}
				})
			})
		},
		onUnload() {
			uni.$off('append');
			uni.$off('modify');
			uni.$off('delete');
		},
		methods: {
			sub() { 
				let rules = [
					// {name: 'items', type: 'required', errmsg: '请选择发货商品'},
					// {name: 'expressNumber', type: 'required', errmsg: '请输入物流单号'},
					// {name: 'expressNumber', type: 'expressNumber', errmsg: '请正确输入物流单号'},
					// {name: 'expressCompany', type: 'required', errmsg: '请输入物流公司'},
				]
				let valLoginRes = this.$validate.validate(this.expressOrder, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.post('/expressOrder/insert', this.expressOrder).then(res => {
						this.output();
						// uni.openDocument({
						// 	  filePath: '/Android/data/io.dcloud.HBuilder/downloads//导出海关信息/2022年1月/海关信息_2022-01-14 16:49:53',
						// 	  showMenu: true,
						// 	  success: function (res) {
						// 		console.log('打开文档成功');
						// 	  }
						// });
						// uni.getSavedFileList({
						//   success: function (res) {
						//     if (res.fileList.length > 0) {
						//       uni.removeSavedFile({
						//         filePath: res.fileList[0].filePath,
						//         complete: function (res) {
						//           console.log(res);
						//         }
						//       });
						//     }
						//   }
						// });
						uni.navigateTo({
							url: './ExpressOrder'
						});
						// this.$api.msg.successToast('添加成功').then(res => {
						// 	uni.navigateTo({
						// 		url: './ExpressOrder'
						// 	});
						// })
					}, error => {
						this.$api.msg.toast(error);
					})
				}	
			},
			getScanCode() {
				let _this = this;
				uni.scanCode({
					scanType:['barCode'],
					success: function (res) {
						_this.expressOrder.expressNumber = res.result
					}
				})
			},
			jumpExpressOrderItemAppend() {
				uni.navigateTo({
					url: './ExpressOrderItemAppend'
				});
			},
			jumpExpressOrderItemEdit(item, index) {
				item.id = index;
				uni.navigateTo({
					url: './ExpressOrderItemEdit?item='+encodeURIComponent(JSON.stringify(item))
				});
			},
			output() {
				// 要导出的json数据
				var items = this.expressOrder.items;
				const jsonData = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					// if (!item.product.customsInfo.hsCode) continue;
					const item = items[i]
					// if (this.current.includes(item.id)) {
						var data = {
							hsCode: '',
							materialBeschaffenheit: '',
							brandArticleNo: '',
							brand: '',
							articleName: '',
							unitPrice: '',
							totalQuantity: '',
							sum: ''
						}
						data.hsCode = item.product.customsInfo.hsCode;
						data.materialBeschaffenheit = item.product.customsInfo.materialBeschaffenheit;
						data.brandArticleNo = item.product.customsInfo.brandArticleNo;
						data.brand = item.product.customsInfo.brand;
						data.articleName = item.product.customsInfo.articleName;
						data.unitPrice = item.product.customsInfo.price / 100;
						data.totalQuantity = item.deliveredQuantity;
						data.sum = data.unitPrice * data.totalQuantity;
						jsonData.push(data);
					// }
				}
				// 列标题
				let worksheet = 'sheet1'
				let str = '<tr><td>HS Code</td><td>Material Beschaffenheit</td><td>Brand Article no.</td>'
						 +'<td>Brand</td><td>Article Name</td><td>unit Price €</td><td>Total Quantity</td><td>Sum</td></tr>'
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
				exportFile(template, "导出海关信息", "海关信息")
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
