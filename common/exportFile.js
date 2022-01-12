import { formatDateThis, getUnixTime } from '@/common/dateUtil.js'
// 导出文件到手机 fileData:要写入到文件的数据，返回参数为文档路径
function exportFile(fileData, documentName = '导出海关信息', info) {
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
		let fileName = info + '_' + formatDateThis(new Date())
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
				// that.successTip = `文件位置：${pathStr}/${documentName}/${year}年${month}月`
			  }, 1000)
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
export {
  exportFile
}