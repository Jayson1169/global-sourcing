<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="html"></web-view>
    </view>
</template>

<script>
    export default {
		onLoad(option) {
			this.html = 'http://m.kuaidi.com/queryresults.html?nu='+option.expressNumber
		},
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
            }
        }
    }
</script>

<style>

</style>