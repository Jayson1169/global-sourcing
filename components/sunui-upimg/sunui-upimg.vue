<template>
	<view class="sunui-uploader-bd">
		<view class="sunui-uploader-files">
			<block v-for="(item, index) in upload_before_list" :key="index">
				<view class="sunui-uploader-file" :class="[item.upload_percent < 100 ? 'sunui-uploader-file-status' : '']" @click="previewImage(index)">
					<image class="sunui-uploader-img" :style="upload_img_wh" :src="item" mode="aspectFill" />
					<view class="sunui-img-removeicon right" @click.stop="removeImage(index)" v-show="upimg_move">×</view>
				</view>
			</block>
			<view v-show="upload_before_list.length < upload_count" hover-class="sunui-uploader-hover" class="sunui-uploader-inputbox" @click="chooseImage" :style="upload_img_wh">
				<view><text class="iconfont icon-mn_shangchuantupian" style="color: #666;"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from './index.js'
export default {
	data() {
		return {	
			upload_before_list: [],
			W: '',
			H: '',
			canvas: null,
			ctx: null,
			maxW: 1024,
			maxH: 1024,
			quality: 0.8,
			base64: true,
			showLoading: '正在压缩',
			mask: true
		};
	},
	props: {
		upload_img_wh: {
			type: String,
			default: 'width:162rpx;height:162rpx;'
		},
		// 上传数量
		upload_count: {
			type: [Number, String],
			default: 1
		},
		// 是否显示删除
		upimg_move: {
			type: Boolean,
			default: true
		},
		photo: ''
	},
	mounted() {
		if (this.photo != null) {
			this.upload_before_list.push(this.photo)
		}
	},
	methods: {
		chooseImage() {
			let _self = this;
			uni.chooseImage({
				count: 1,
				// count: _self.upload_count - _self.upload_before_list.length,
				sizeType: ['compressed', 'original'],
				sourceType: ['album', 'camera'],
				success: function(res) {
					for (let i = 0, len = res.tempFiles.length; i < len; i++) {
						res.tempFiles[i]['upload_percent'] = 0;
						// _self.upload_before_list.push(res.tempFiles[i]);
					}
					// pathToBase64(res.tempFilePaths[0]).then(base64 => {
					// 	_self.upload_before_list.push(base64);
					// 	_self.$emit("photo", base64)
					// }).catch(error => {
					// 	console.error(error)
					// })
					_self.compress(res.tempFilePaths).then(res => {
						_self.upload_before_list.push(res);
						_self.$emit("photo", res)
						// _self.upload_before_list.push(res);
					})
					// _self.compress(res.tempFilePaths[0]).then(res => {
					// 	pathToBase64(res.tempFilePaths[0]).then(base64 => {
					// 		_self.upload_before_list.push(base64);
					// 		_self.$emit("photo", base64)
					// 	}).catch(error => {
					// 		console.error(error)
					// 	})
					// })
					
				},
				fail: function(err) {
					console.log(err);
				}
			});
		},
		removeImage(idx) {
			let _self = this;
			_self.upload_before_list.splice(idx, 1);
			_self.$emit("photo", null)
		},
		previewImage(idx) {
			let _self = this;
			let preview = [];
			for (let i = 0, len = _self.upload_before_list.length; i < len; i++) {
				// step3.这里修改服务器返回字段 ！！！
				preview.push(_self.upload_before_list[i]);
			}
			uni.previewImage({
				current: idx,
				urls: preview
			});
		},
		async compress (args, options = {}) {
			return new Promise(async (resolve, reject) => {
				let files;
				if (arguments[0].tempFiles || arguments[0].tempFilePaths) {
					files = arguments[0].tempFilePaths || arguments[0].tempFiles;
				};
				files = arguments[0]
				if (arguments[0].files) {
					files = arguments[0].files;
				}
				if (!files instanceof Array) {
					reject('数据格式错误');
				}
				if (!files.length) {
					reject('数据不能为空');
				}				
				this.maxW = options.maxW || 1024;
				this.maxH = options.maxH || 1024;
				this.quality = options.quality || 0.8;
				this.base64 = options.base64 || false;
				this.showLoading = options.showLoading === true ? '正在压缩' : typeof options.showLoading === 'string' ? options.showLoading : false;
				this.mask = options.mask || true;
				if (this.showLoading) {
					uni.showLoading({
						title: this.showLoading,
						mask: this.mask
					})
				}
				try {
					const result = await this.convertImageToBase64(files);
					resolve(result);
					uni.hideLoading();
				} catch (error) {
					reject(error);
					uni.hideLoading();
				}
			})
		},
		toBase64H5 (file) {
			return new Promise((resolve, reject) => {
				let result = [];
				for (let i = 0; i < file.length; i++) {
					let reader = new FileReader();
					let base64Result;
					reader.addEventListener('load', (e) => {
						base64Result = reader.result || e.target.result;
						let filename = file[i].name.slice(0, file[i].name.lastIndexOf('.'));
						result.push({base64: base64Result, filename});
					    reader = null;
						if (result.length === file.length) {
							resolve(result);
						}
					});
					reader.readAsDataURL(file[i]);
				}
			})
		},
		compressResultH5 (base64Item) {
			return new Promise((resolve, reject) => {
				let maxW = this.maxW;
				let maxH = this.maxH;
				let ratio, needCompress = false;
				let image = new Image();
				image.src = base64Item.base64;
				image.addEventListener('load', () => {
					if (image.naturalWidth > maxW) {
						needCompress = true;
						ratio = image.naturalWidth / maxW;
						maxH = image.naturalHeight / ratio;
					}
					if (image.naturalHeight > maxH) {
						needCompress = true;
						ratio = image.naturalHeight / maxH;
						maxW = image.naturalWidth / ratio;
					}
					if (!needCompress) {
						maxW = image.naturalWidth;
						maxH = image.naturalWidth;
					}
					if (!this.canvas) {
						this.canvas = document.createElement('canvas');
					}
					this.canvas.width = maxW;
					this.canvas.height = maxH;
					const ctx = this.canvas.getContext('2d');
					ctx.clearRect(0, 0, maxW, maxH);
					ctx.drawImage(image, 0, 0, maxW, maxH);
					const compressImg = this.canvas.toDataURL('image/jpeg', this.quality);
					// console.log(compressImg)
					resolve(compressImg)
					// // console.log(base64Item)
					let file = this._dataURLtoFile(compressImg, base64Item.filename);
					if (this.base64) {
						resolve({base64: compressImg, file});
					} else {
						resolve({file});
					}
					image = null;
					// ratio: base64Item.base64.length / compressImg.length
				})
			})
		},
		compressImageH5 (base64Result) {
			let result = [];
			return new Promise(async (resolve, reject) => {
				for (let i = 0; i < base64Result.length; i++) {
					let res = await this.compressResultH5(base64Result[i]);
					// result.push(res);
					resolve(res);
					// if (result.length === base64Result.length) {
					// 	resolve(result);
					// 	this.canvas = null;
					// }
				}
			})
		},
		async convertImageToBase64 (files) {
			// #ifdef H5
				if (typeof files[0] === 'object') {
					let result = await this.toBase64H5(files);
					return await this.compressImageH5(result);
				}
				if (typeof files[0] === 'string') {					
					let result = files.map(item => {
						return {
							base64: item
						}
					});
					return await this.compressImageH5(result);
				}
				return [];
			// #endif
			
			// #ifndef H5
				if (typeof files[0] === 'string') {
					const result = await this.getImgInfoWX(files);
					return await this.compressImageWX(result);
				}
				if (typeof files[0] === 'object') {
					files = files.map(item => {
						return item.path
					});
					const result = await this.getImgInfoWX(files);
					return await this.compressImageWX(result);
				}
				return [];
			// #endif
			return [];
		},
		getImgInfoWX (tempFilePaths) {
			let result = [];
			return new Promise((resolve, reject) => {
				for (let i = 0; i < tempFilePaths.length; i++) {
					uni.getImageInfo({
					    src: tempFilePaths[i],
					    success: (image) => {
							result.push({tempFilePaths: tempFilePaths[i], image});
							if (result.length === tempFilePaths.length) {
								resolve(result);
							}
					    }
					});
				}
			})
		},
		compressResultWX (tempFilePaths) {
			return new Promise((resolve, reject) => {
				let maxW = this.maxW;
				let maxH = this.maxH;
				let ratio, needCompress = false;
				tempFilePaths.image.width = Number(tempFilePaths.image.width);
				tempFilePaths.image.height = Number(tempFilePaths.image.height);
				if (tempFilePaths.image.width > maxW) {
					needCompress = true;
					ratio = tempFilePaths.image.width / maxW;
					maxH = tempFilePaths.image.height / ratio;
				}
				if (tempFilePaths.image.height > maxH) {
					needCompress = true;
					ratio = tempFilePaths.image.height / maxH;
					maxW = tempFilePaths.image.width / ratio;
				}
				if (!needCompress) {
					maxW = tempFilePaths.image.width;
					maxH = tempFilePaths.image.height;
				}
				this.W = maxW;
				this.H = maxH;
				if (!this.ctx) {
					this.ctx = uni.createCanvasContext('canvas', this);
				}
				this.ctx.clearRect(0, 0, this.W, this.H);
				this.ctx.drawImage(tempFilePaths.tempFilePaths, 0, 0, maxW, maxH);
				this.ctx.draw(false, () => {
					uni.canvasToTempFilePath({
					  x: 0,
					  y: 0,
					  width: this.W,
					  height: this.H,
					  destWidth: this.W,
					  destHeight: this.H,
					  canvasId: 'canvas',
					  quality: this.quality,
					  success: (res) => {
						let file = res.tempFilePath;
						let base64 = uni.getFileSystemManager().readFileSync(file, 'base64');
						base64 = `data:image/jpeg;base64,${base64}`
						if (this.base64) {
							resolve({file, base64});
						} else {
							resolve({file});
						}
					  }
					}, this)
				});
			})
		},
		compressImageWX (tempFilePaths) {
			let result = [];
			return new Promise(async (resolve, reject) => {
				for (let i = 0; i < tempFilePaths.length; i++) {
					let res = await this.compressResultWX(tempFilePaths[i]);
					result.push(res);
					if (result.length === tempFilePaths.length) {
						resolve(result);
						this.ctx = null;
					}
				}
			})
		},
		_dataURLtoFile (dataurl, filename) {
		  let arr = dataurl.split(',');
		  let mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		  while(n--){
		      u8arr[n] = bstr.charCodeAt(n);
		  }
		  return new File([u8arr], filename, {type:mime});
		}
	}
};
</script>

<style lang="scss">
@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/iconfont.eot?t=1574391686418');
	/* IE9 */
	src: url('//at.alicdn.com/iconfont.eot?t=1574391686418#iefix') format('embedded-opentype'),
		/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMkAAsAAAAAB2QAAALYAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCYIJEATYCJAMICwYABCAFhG0HPRt3BhEVlCNkH4dxmzUXNsJHc1SNfR9KTkCtiXv/l+QDBQSFRBJdKoEsg60HUgCsOpWVnWxNx3BvVITqkj3fepbtzM/OfDo4D86iFEIiJAeX02+Bh/O84TLmsrEnYBxQoHtgm6xACoxTkN0zFsgEdQynCShpq7cwbsK0eTKROSkgbNu8cbUspRFrkoNMkC9ZGYWjcrJkX/IIR/zPhz/6hIxELmWmzdowfp1RvxdbYWm1VrUMCO54JvDrSNEbkTCv1DJDGvp6S5VUX9SRdSUHfi+u1cBZ7R+PQMgzEyugNcU5J67DO9VfJiCigD042iuNQqXSunGRfvrWV6/mvX49/+3bhW/eLHr4puOFtxMfvO5w9tX8yv7rIbf3Rrl84Mbe66XSzWet46nn/etMuALua5LqNZUqpKdfDKjsv2qef+yambJsTWM2zDtKIQ0pS7msvSTUpn1tNyts2xZmWUyw3LI4bPisSZNyOUc2y4/scfZs3QZ1UcgqUWtkVednsvnVs7NOHzmqglXIBnqU7+/M9Hp3y3L2RLWYA9uhlat61/LGGwVqt9Nvafv/8R2fmg/pu7LesH9ZOYL3/6e3P6Z2O0rbIztra+Dtc1u2RY1vapOocEtDiT0Kd1VUUkIN42joS19Fk1s1BVmKy0OioA2kMp1REdcbcsr6QV5mJJT0MnF9mbQRchZiET29CAT1fSBR1y1I1fdFRdwPcpr6Q179cIaSBaHRjmVdgxFjCSvGFuonmGYcpK1nESRfUC1dRUm+T3ggeeOEOIiywRwHpDHm+FUlzBIkjT1k5DzsuhEmGi02HGjmKQ1DWfaioBn7gzAWQRWGWqD2BIzGaCDRm4nc+y+QsuhUqKaqyviAiGcGB7FA1AKVS4ZWVddyibdSEoxJQCKjHsjIMNTpjMBUPsxCDRbQPTyTVGh1k20lwfyy/un2QYmpTII1I9Vo+1B4XQ2q0QvwvExGfTgA')
			format('woff2'),
		url('//at.alicdn.com/iconfont.woff?t=1574391686418') format('woff'), url('//at.alicdn.com/iconfont.ttf?t=1574391686418') format('truetype'),
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url('//at.alicdn.com/iconfont.svg?t=1574391686418#iconfont') format('svg');
	/* iOS 4.1- */
}

@charset "UTF-8";

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-mn_shangchuantupian {
	&:before {
		content: '\e559';
	}
	font-size: 3em;
}

.sunui-uploader-img {
	display: block;
}

.sunui-uploader-input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}

.sunui-uploader-inputbox {
	position: relative;
	// margin-bottom: 16rpx;
	margin-bottom: 0rpx;
	box-sizing: border-box;
	background-color: #ededed;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

.sunui-img-removeicon {
	position: absolute;
	color: #fff;
	width: 40upx;
	height: 40upx;
	line-height: 40upx;
	z-index: 2;
	text-align: center;
	background-color: #e54d42;

	&.right {
		top: 0;
		right: 0;
	}
}

.sunui-uploader-file {
	position: relative;
	// margin-right: 16rpx;
	// margin-bottom: 16rpx;
}

.sunui-uploader-file-status:before {
	content: ' ';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
}

.sunui-loader-filecontent {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #fff;
	z-index: 9;
}

.sunui-uploader-bd {
	padding: 26rpx 0rpx 26rpx 0rpx;
	margin: 0;
}

.sunui-uploader-files {
	display: flex;
	flex-wrap: wrap;
}

.sunui-uploader-file:nth-child(4n + 0) {
	margin-right: 0;
}

.sunui-uploader-inputbox > view {
	text-align: center;
}

.sunui-uploader-file-status:after {
	content: ' ';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	// background-color: rgba(0, 0, 0, 0.5);
}

.sunui-uploader-hover {
	box-shadow: 0 0 0 #e5e5e5;
	background: #e5e5e5;
}
</style>
