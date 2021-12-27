<template>
	<view class="product_list">
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in purchaseOrderList" :key="index" v-if="item.status === 'WAREHOUSED'">
					<view class="list">
						<checkbox class="radio" :value="item.id" :checked="item.checked" />
						<view class="list_l"></view>
						<view class="list_r">
							<view class="list_r_01">{{item.product.name}}</view>
							<view class="list_r_02">{{item.product.brand}} x {{item.quantity}}</view>
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
		<u-tabbar
			:value="value"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="采购管理" icon="shopping-cart" @click="click" ></u-tabbar-item>
			<u-tabbar-item text="快递物流" icon="car" @click="click" ></u-tabbar-item>
			<u-tabbar-item text="导出海关信息" icon="reload" @click="click" ></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import { formatDateThis, getUnixTime } from '@/common/dateUtil.js'
	var that
	export default {
		data() {
			return {
				value: 2,
				items: [{
						id: '1',
						name: '曼秀雷敦男士控油抗痘洁面乳',
						brand: '曼秀雷敦',
						quantity: 4
					},
					{
						id: '2',
						name: '曼秀雷敦男士控油抗痘洁面乳',
						brand: '曼秀雷敦',
						quantity: 1
					},
					{
						id: '3',
						name: '曼秀雷敦男士控油抗痘洁面乳',
						brand: '曼秀雷敦',
						quantity: 2
					}
				],
				request: {
					warehouseKeeperId: '',
					page: '0',
					size: '999'
				},
				current: [],
				purchaseOrderList: [{"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null, "warehouseKeeper": {"name": "yinxin", "phoneNumber": "18390818785"}},{"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null, "warehouseKeeper": {"name": "yinxin", "phoneNumber": "18390818785"}}],
			};
		},
		onLoad(option) {
			that = this
			// this.purchaseOrderList = JSON.parse(decodeURIComponent(option.purchaseOrderList));
			// this.purchaseOrderList.some((purchaseOrder, i) => {
			// 	if (purchaseOrder.status != "WAREHOUSED") {
			// 		this.purchaseOrderList.splice(i, 1)
			// 	}
			// })
			this.request.warehouseKeeperId = uni.getStorageSync('user').id
			this.$api.http.get('/purchaseOrder/findAllByWarehouseKeeper', this.request).then(res => {
				this.purchaseOrderList = res.content
			})
		},
		methods: {
			click(e) {
				if (e == 0) {
					uni.redirectTo({
						url: './WarehouseKeeper'
					})
				} else if (e == 1) {
					uni.redirectTo({
						url: './ExpressOrder'
					})
				} else {
					uni.redirectTo({
						url: './WarehouseOutput?purchaseOrderList='+encodeURIComponent(JSON.stringify(this.purchaseOrderList))
					})
				}
			},
			checkboxChange: function (e) {
				// var items = this.purchaseOrderList;
				this.current = e.detail.value;
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if (values.includes(item.id)) {
				// 		this.$set(item,'checked',true)
				// 	} else {
				// 		this.$set(item,'checked',false)
				// 	}
				// }
			},
			output() {
				// 要导出的json数据
				var items = this.purchaseOrderList;
				const jsonData = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (this.current.includes(item.id)) {
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
						data.unitPrice = item.purchasePrice / 100;
						data.totalQuantity = item.quantity;
						data.sum = data.unitPrice * data.totalQuantity;
						jsonData.push(data);
					}
				}
				// const jsonData = [{
				// 	hsCode: '测试数据',
				// 	materialBeschaffenheit: '123456',
				// 	brandArticleNo: '123@456.com',
				// 	brand: 'test',
				// 	articleName: 'test',
				// 	unitPrice: 'test',
				// 	totalQuantity: 'test',
				// 	sum: 'test'
				// }]
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
				exportFile(template)
			}
		}
	}
	// 导出文件到手机 fileData:要写入到文件的数据，返回参数为文档路径
	function exportFile(fileData, documentName = '导出海关信息') {
		/*
		PRIVATE_DOC: 应用私有文档目录常量
		PUBLIC_DOCUMENTS: 程序公用文档目录常量
		*/
	  plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fs) {
		let rootObj = fs.root
		let fullPath = rootObj.fullPath
		// let reader = rootObj.createReader();
		// console.log(reader);
		// reader.readEntries((res)=>{
		//     console.log(res); //这里拿到了该目录下所有直接文件和目录
		// },(err)=>{console.log(err);})
	
		console.log('开始导出数据********')
		// 创建文件夹
		rootObj.getDirectory(documentName, {
		  create: true
		}, function(dirEntry) {
		  // 获取当前的年月继续创建文件夹
		  let date = new Date()
		  let year = date.getFullYear()
		  let month = date.getMonth() + 1
		  dirEntry.getDirectory(`${year}年${month}月`, {
			create: true
		  }, function(dirEntry2) {
			// 创建文件,防止重名
			let fileName = formatDateThis(new Date())
			// let fileName = 'excel' + getUnixTime(formatDateThis(new Date()))
			console.log(fileName)
			dirEntry2.getFile(`${fileName}.xlsx`, {
			  create: true
			}, function(fileEntry) {
			  fileEntry.createWriter(function(writer) {
				writer.onwritestart = (e) => {
				  uni.showLoading({
					title: '正在导出',
					mask: true
				  })
				}
				//  /storage/emulated/0指的就是系统路径
				let pathStr = fullPath.replace('/storage/emulated/0', '')
				writer.onwrite = (e) => {
				  // 成功导出数据;
				  uni.hideLoading()
				  setTimeout(() => {
					uni.showToast({
					  title: '成功导出至：'+`${pathStr}/${documentName}/${year}年${month}月`,
					  icon: 'none'
					})
					console.log(`文件位置：${pathStr}/${documentName}/${year}年${month}月`)
					this.$api.msg.toast(`文件位置：${pathStr}/${documentName}/${year}年${month}月`)
					that.successTip = `文件位置：${pathStr}/${documentName}/${year}年${month}月`
				  }, 500)
				}
				// 写入内容;
				writer.write(fileData)
			  }, function(e) {
				console.log(e.message)
			  })
			})
		  })
		})
	  })
	}
</script>

<style lang="scss" scoped>
	.product_list {
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
			bottom: 100upx;
			width: 100%;
			z-index: 9999;
		}
	}
</style>
