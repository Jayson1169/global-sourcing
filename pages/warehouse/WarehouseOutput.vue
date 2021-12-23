<template>
	<view class="product_list">
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
					<view class="list">
						<checkbox class="radio" :value="item.value" :checked="item.checked" />
						<view class="list_l"></view>
						<view class="list_r">
							<view class="list_r_01">{{item.name}}</view>
							<view class="list_r_02">{{item.brand}} x {{item.quantity}}</view>
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
	import { formatDateThis, getUnixTime } from '@/common/dateUtil.js'
	var that
	export default {
		data() {
			return {
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
				current: '',
				purchaseOrderList: [{"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null, "warehouseKeeper": {"name": "yinxin", "phoneNumber": "18390818785"}},{"id":21,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-17 17:58:06","buyer":{"id":16,"createTime":"2021-12-14 20:16:26","updateTime":"2021-12-14 20:16:27","username":"18390818785","password":"$2a$10$wT1N1PS1hkQ5T0sFMXUaau6bqjctpC5X2zPyzO3sgYPUputD5R.ri","name":"Jack","role":"BUYER","phoneNumber":null},"status":"READY","invoice":null,"invoiceDate":null,"photo":null,"product":{"id":41,"createTime":"2021-12-16 00:39:36","updateTime":"2021-12-16 00:39:36","name":"曼秀雷敦男士控油抗痘洁面乳","barcode":null,"specification":"150ml","image":null,"manufacturer":null,"origin":"广东省中山市","remark":null},"purchasePrice":null,"quantity":4,"rejectReason":null, "warehouseKeeper": {"name": "yinxin", "phoneNumber": "18390818785"}}],
			};
		},
		onLoad() {
			that = this
		},
		methods: {
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				console.log(values)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			output() {
				// 要导出的json数据
				const jsonData = [{
					name: '测试数据',
					phone: '123456',
					email: '123@456.com'
				}]
				// 列标题
				let worksheet = 'sheet1'
				let str = '<tr><td>姓名</td><td>电话</td><td>邮箱</td></tr>'
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
	function exportFile(fileData, documentName = '项目Excel文件') {
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
	        let fileName = 'excel' + getUnixTime(formatDateThis(new Date()))
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
	                  title: '成功导出',
	                  icon: 'success'
	                })
					console.log(`文件位置：${pathStr}/${documentName}/${year}年${month}月`)
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
			bottom: 0;
			width: 100%;
			z-index: 9999;
		}
	}
</style>
