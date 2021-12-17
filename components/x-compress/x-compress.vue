<template>
	<view class="image-compress-container">
		<!-- #ifndef H5 -->
			<canvas :style="{width: W + 'px', height: H + 'px', visibility: 'hidden'}" class="canvas" canvas-id="canvas"></canvas>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data () {
			return {
				W: '',
				H: '',
				canvas: null,
				ctx: null,
				maxW: 1024,
				maxH: 1024,
				quality: 0.8,
				base64: false,
				showLoading: '正在压缩',
				mask: true
			}
		},
		methods: {
			async compress (args, options = {}) {
				return new Promise(async (resolve, reject) => {
					let files;
					if (arguments[0].tempFiles || arguments[0].tempFilePaths) {
						files = arguments[0].tempFilePaths || arguments[0].tempFiles;
					};
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
						result.push(res);
						if (result.length === base64Result.length) {
							resolve(result);
							this.canvas = null;
						}
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
	}
</script>

<style scoped>
	.image-compress-container {
		width: 0;
		height: 0;
		margin: 0;
		padding: 0;
		overflow: hidden;
		position: absolute;
		z-index: -100000;
	}
</style>
