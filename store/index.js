import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {},
		hasLogin: false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.user.token = provider.token
			state.user.name = provider.name
			uni.setStorage({
				key: 'user',
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false
			state.user = {}
			uni.removeStorage({
				key: 'user'
			});
		}
	}
})

export default store
