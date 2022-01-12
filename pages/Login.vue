 <template>
	<view class="content">
		<view class="login">
			<view class="login-top">登录</view>
			<view class="login-center clearfix">
				<view class="login-center-img"><image src="../imgs/name.png"/></view>
				<view class="login-center-input">
					<input type="text" placeholder="请输入您的用户名" v-model="userForm.username"/>
				</view>
			</view>
			<view class="login-center clearfix">
				<view class="login-center-img"><image src="../imgs/password.png"/></view>
				<view class="login-center-input">
					<input type="password" placeholder="请输入您的密码" v-model="userForm.password"/>
				</view>
			</view>
			<view class="login-button" @click="sub">登陆</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				userForm: {
					username: '793073861',
					password: 'a123456'
				}
			};
		},
		onLoad() {
			let user = uni.getStorageSync('user')
			if (user != null) {
				this.userForm.username = user.username;
				this.userForm.password = user.password;
			}
		},
		methods: {
			sub() {
				this.$api.http.login("/login", this.userForm).then(res => {
					this.$api.msg.successToast("登录成功")
					// setTimeout(function() {
					// 	uni.setStorageSync('user', res)
					// 	let roleList = _this.$api.json.roleList
					// 	uni.redirectTo({
					// 		url: roleList[res.role]
					// 	})
					// }, 500)
					res.password = this.userForm.password
					uni.setStorageSync('user', res)
					let roleList = this.$api.json.roleList
					uni.redirectTo({
						url: roleList[res.role]
					})
				})
			},
		}
	};
</script>

<style lang="scss">
.clearfix:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: ' ';
	clear: both;
	height: 0;
}
.content {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: hidden;
}
.login {
	width: 350px;
	border-radius: 5px;
	height: 500px;
	background: white;
}
.login-top {
	font-size: 24px;
	margin-top: 100px;
	padding-left: 40px;
	box-sizing: border-box;
	color: #333333;
	margin-bottom: 50px;
}
.login-center {
	width: 100%;
	box-sizing: border-box;
	padding: 0 40px;
	margin-bottom: 30px;
}
.login-center-img {
	width: 40rpx;
	height: 40rpx;
	float: left;
	margin-top: 5px;
}
.login-center-img > image {
	width: 100%;
	height: 100%;
}
.login-center-input {
	float: left;
	width: 218px;
	margin-left: 5px;
	height: 30px;
	position: relative;
}
.login-center-input input {
	font-size: 35upx;
	z-index: 2;
	transition: all 0.5s;
	padding-left: 10px;
	color: #333333;
	width: 100%;
	height: 30px;
	border: 0;
	border-bottom: 1px solid #cccccc;
	border-top: 1px solid #ffffff;
	border-left: 1px solid #ffffff;
	border-right: 1px solid #ffffff;
	box-sizing: border-box;
	outline: none;
	position: relative;
}
.login-center-input input:focus {
	border: 1px solid dodgerblue;
}
.login-center-input-text {
	background: white;
	padding: 0 5px;
	position: absolute;
	z-index: 0;
	opacity: 0;
	height: 20px;
	top: 50%;
	margin-top: -10px;
	font-size: 30upx;
	left: 5px;
	color: dodgerblue;
	line-height: 20px;
}
.login-center-input input:focus ~ .login-center-input-text {
	top: 0;
	z-index: 3;
	opacity: 1;
	margin-top: -15px;
}
.login-button {
	cursor: pointer;
	width: 250px;
	text-align: center;
	height: 40px;
	line-height: 40px;
	background-color: dodgerblue;
	border-radius: 5px;
	margin: 0 auto;
	margin-top: 50px;
	color: white;
	font-size: 35upx;
}
</style>
