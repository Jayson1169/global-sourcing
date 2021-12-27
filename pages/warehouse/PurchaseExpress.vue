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
				<button @click="output" class="cu-btn bg-red margin-tb-sm lg">发送</button>
			</view>
		</view>	
	</view>
</template>

<script>
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
		methods: {
		}
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
