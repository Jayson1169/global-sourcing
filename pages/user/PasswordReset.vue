<template>
	<view class="product">
		<view class="top">
		</view>
		<view class="cu-form-group">
			<view class="title">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</view>
			<input v-model="username" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
			<input v-model="name" disabled></input>
		</view>
		<view class="cu-form-group">
			<view class="title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</view>
			<input password="true" placeholder="长度在6～18位之间,包含数字和字母" v-model="userForm.password" maxlength="16" @focus="Listeningfocus"></input>
		</view>
		<view class="H50"></view>
		<view class="p_btn">
			<view class=" flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="update()">重置密码</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				userForm: {
					id: '',
					password: '',
				}
			};
		},
		methods: {
			Listeningfocus() {
				this.userForm.password = ''
			},
			update() {  
				let rules = [
					{name: 'password', type: 'required', errmsg: '请输入密码'},
					{name: 'password', type: 'pwd', errmsg: '密码长度在6～18位之间,包含数字和字母'},
				]
				let valLoginRes = this.$validate.validate(this.userForm, rules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				} else {
					this.$api.http.put('/user/updatePassword?id='+this.userForm.id+'&password='+this.userForm.password, null).then(res => {
						this.$api.msg.successToast("修改成功")						
						setTimeout(function() {
							uni.navigateBack({delta:2})
						}, 500)
					})
				}
			}
		},
		onLoad: function (option) {
			this.username = option.username
			this.name = option.name
			this.userForm.id = option.id
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
