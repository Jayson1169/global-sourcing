// 处理多次点击
function noMultipleClicks(methods) {
    let that = this;
    if (that.noClick) {
		that.noClick = false;
		methods;
    } else {
        uni.showToast({
            title: '请勿重复点击',
            duration: 2000,
            icon: 'none'
        })
    }
}

//导出
export {
    noMultipleClicks,//禁止多次点击
}