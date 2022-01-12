<template>
	<view>
		<view class="detail">商品信息</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">商品名称：</view>
			<selectlay :value="purchaseOrder.product.name" name="name" placeholder="请选择或搜索商品" :showplaceholder="false" slabel="name" svalue="id" @selectitem="selectitem"></selectlay>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.brand">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品品牌：{{purchaseOrder.product.brand}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.specification">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品型号：{{purchaseOrder.product.specification}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.barcode">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品条码：{{purchaseOrder.product.barcode}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.image">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">商品图片：</view>
			<myimg :photo="purchaseOrder.product.image" :padding="true"></myimg>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.manufacturer">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">生产厂家：{{purchaseOrder.product.manufacturer}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.origin">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">生产地区：{{purchaseOrder.product.origin}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.remark">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">备注信息：{{purchaseOrder.product.remark}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.barcode">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">国外库存：{{purchaseOrder.product.inventory.warehouseInventory}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.barcode">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">在途库存：{{purchaseOrder.product.inventory.midwayInventory}}</view>
		</view>
		<view class="cu-form-group" v-if="purchaseOrder.product.barcode">
			<text :style="{color:'white'}">*</text>
			<view class="cu-form-title">国内库存：{{purchaseOrder.product.inventory.hubInventory}}</view>
		</view>
		<view class="detail">采购明细</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">采购数量：</view>
			<input type="number" placeholder="请输入采购数量" v-model="purchaseOrder.quantity"></input>
		</view>
		<view class="H50"></view>
		<view class="o_btn">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">添加采购单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				purchaseOrder: {
					product: {
						image: null,
						name: '',
						brand: '',
						specification: '',
						barcode: '',
						manufacturer: '',
						origin: '',
						remark: '',
						inventory: {
							warehouseInventory: '',
							midwayInventory: '',
							hubInventory: ''
						}
					},
					quantity: '',
				}
			}
		},
		methods: {
			sub() {
				let purchaseForm = this.purchaseOrder.product;
				purchaseForm.quantity = this.purchaseOrder.quantity;
				let rules = [
					{name: 'name', required: true, type: 'required', errmsg: '请选择或搜索商品'},
					{name: 'quantity', required: true, type: 'required', errmsg: '请输入采购数量'}
				]
				let valLoginRes = this.$validate.validate(purchaseForm, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.post("/purchaseOrder/create?productId="+this.purchaseOrder.product.id+"&quantity="+this.purchaseOrder.quantity).then(res => {
						this.$api.msg.successToast('添加成功').then(res => {
							this.$emit('edit');
							uni.navigateBack();
						})
					})
				}	
			},
			selectitem(index, item) {
				if (index >= 0) {
					this.$api.http.get('/product/getImage?id='+item.id, null).then(res => {
						item.image = res;
						this.purchaseOrder.product = item;
					})
				} else {
					this.purchaseOrder.product = ""
				}
			},
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
	.cu-form-group .title {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		/* add */
		flex: 0 0 150upx;
	}
</style>
