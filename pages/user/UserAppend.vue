<template>
	<view class="product">
		<view class="top">
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</view>
			<input placeholder="长度在6～18位之间,不包含特殊字符" v-model="userForm.username" maxlength="18"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</view>
			<input password="true" placeholder="长度在6～18位之间,包含数字和字母" v-model="userForm.password" maxlength="18"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'red'}">*</text>
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input placeholder="长度在2～10位之间" v-model="userForm.name"></input>
		</view>
		<view class="cu-form-group">
			<text :style="{color:'white'}">*</text>
			<view class="title">手机号码：</view>
			<input type="number" placeholder="请输入手机号码"  v-model="userForm.phoneNumber" maxlength="11"></input>
		</view>
		<view class="cu-form-group" @click="useOutClickSide">
			<text :style="{color:'red'}">*</text>
			<view class="title">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</view>
	        <easy-select ref="easySelect" size="medium" @selectOne="selectOne" v-model="role"></easy-select>
	    </view>	
		<view class="H50"></view>
		<view class="p_btn">
			<view class=" flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="sub()">添加</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: '',
				userForm: {
					username: '',
					name: '',
					password: '',
					role: '',
				}
			};
		},
		methods: {
			init() {
				this.userForm.username = '',
				this.userForm.name = '',
				this.userForm.password = '',
				this.userForm.role = '',
				this.userForm.phoneNumber = '',
				this.role = ''
			},
			selectOne(options) {
				this.role = options.label
				this.userForm.role = options.value
			},
			useOutClickSide() {
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
			},
			sub() {  
				let rules = [
					{name: 'username', type: 'required', errmsg: '请输入账号'},
					{name: 'username', type: 'username', errmsg: '账号长度在6～18位之间,不包含特殊字符'},
					{name: 'password', type: 'required', errmsg: '请输入密码'},
					{name: 'password', type: 'pwd', errmsg: '密码长度在6～18位之间,包含数字和字母'},
					{name: 'name', type: 'required', errmsg: '请输入姓名'},
					{name: 'name', type: 'lengthRange', min: 2, max: 10, errmsg: '姓名长度在2～10位之间'},
					{name: 'role', type: 'required', errmsg: '请选择身份'}
				]
				let valLoginRes = this.$validate.validate(this.userForm, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.post('/user/insert', this.userForm).then(res => {
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						})
						uni.navigateTo({
							url: '../Login'
						})
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F7F6FB;
	}
	
	.p_btn {
		background: #F7F6FB;
		padding: 0 10px 0px;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999;
		
	}
	.u_input {
		font-size: 15px;
		background: #FFFFFF;
	} 
</style>
